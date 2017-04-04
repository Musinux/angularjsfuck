# angularjsfuck

The goals is to permit the execution of any javascript code inside angularjs expressions starting from angular 1.6

 
Usage:
```
npm install
node index.js <javascript expression> [--clean]
```
Output:
```
{{constructor.constructor(<encoded javascript expression>)()}}

```
