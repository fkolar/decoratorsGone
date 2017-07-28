This is simple demo showing that when we build app using
```
    npm install
    ng build --aot=true
```

then all the metadata are removed so custom decorators, information about @angular's 
decorators: `Inject, INput, Output` are gone. And if the nature of the application is dynamic 
meaning processing of certain logic or rendering is based on given metadata at runtime, then 
applications stops working.

Under `@ngtools/webpack/src/loader.js` we are trying to remove all the decorators :

```ts

 Promise.resolve()
            .then(() => {
            if (!plugin.skipCodeGeneration) {
                return Promise.resolve()
                    .then(() => _removeDecorators(refactor))
                    .then(() => _replaceBootstrap(plugin, refactor));
            }
    
```

and additionally trying to provide and add to the class static property only for Ctors

```ts

function _addCtorParameters(classNode, angularImports, refactor) {
    ....
    const ctorParametersDecl = `static ctorParameters() { return [ ${params.join(', ')} ]; }`;
    refactor.prependBefore(classNode.getLastToken(refactor.sourceFile), ctorParametersDecl);
}
```

We should try to leverage whatever already exists inside `ngc`. So if you run:

`ng build --aot=true`

then output e.g of the class that before looks like this:
 
 ```ts

@Component({
  selector:  'app-hello',
  template:  'Hello {{toWhom}}, from {{from}}',
  styleUrls: ['./hello.component.css'],
  inputs: ['toWhom', 'from'],
})
export class HelloComponent implements OnInit {


  toWhom: string = 'Pepa';
  from: string = 'Jozo';

  @Input()
  aa: String = 'aaaaa';

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    console.log(HelloComponent['decorators'])
  }
}
```

will became:

```ts
var HelloComponent = (function () {
    function HelloComponent(elementRef) {
        this.elementRef = elementRef;
        this.toWhom = 'Pepa';
        this.from = 'Jozo';
        this.aa = 'aaaaa';
    }
    HelloComponent.prototype.ngOnInit = function () {
        console.log(HelloComponent['decorators']);
    };
    HelloComponent.ctorParameters = function () { return [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* ElementRef */] }]; };
    return HelloComponent;
}());

```
Notice added `HelloComponent.ctorParameters ` but the rest of the information are gone.
 
But if build your app without `ng` just with `ngc`, then output is as expected. Run 
 
```
    npm run build:aot
``` 

Then check the `out-aot/build.js` and all `__decorators` meta are removed and replaced with
static properties describing the meta.

```ts

var HelloComponent = (function () {
    function HelloComponent(elementRef) {
        this.elementRef = elementRef;
        this.toWhom = 'Pepa';
        this.from = 'Jozo';
        this.aa = 'aaaaa';
    }
    HelloComponent.prototype.ngOnInit = function () {
        console.log(HelloComponent['decorators']);
    };
    return HelloComponent;
}());
HelloComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-hello',
                template: 'Hello {{toWhom}}, from {{from}}',
                styleUrls: ['./hello.component.css'],
                inputs: ['toWhom', 'from'],
            },] },
];
/** @nocollapse */
HelloComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
HelloComponent.propDecorators = {
    'aa': [{ type: Input },],
};

```

So NGC already does it for us, so why to have additional steps in the `@ngtools/webpack/src/loader.js`
to remove everything and then re-add `ctorParameters`


I think it simply must work even for NG. Could it be just timing where you remove decorators before
it comes to ngc or something similar ? Somewhere inside you 

Also if you notice inside `tsconfig.app-aot-step2.json` I dont even specify

```json
    "annotationsAs": "static fields"
```

it seems to be default behavior when 

```
    "skipMetadataEmit" : false
```

or is missing.

