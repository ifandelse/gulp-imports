#Gulp-Imports 0.0.2

A gulp plugin to make file imports/includes easy.

>WARNING - this is serious alphaware - I still need to add tests and examples for more than just JavaScript imports.

##The Basic Idea
I loved Anvil.js - it's by far the best CoC approach to JavaScript/web asset builds that I've ever seen. I want the same "import" syntax for projects of mine using Gulp, that I had with Anvil.js.

For example, consider the following files:

###file1.js
```
var file1 = function() {
    console.log("I'm a function from file1.js");
};

//import("subdir1/file2.js");

//import("subdir2/file4.js");
```

###subdir1/file2.js
```
var file2 = function() {
    console.log("I'm a function from file2.js");
};

//import("subdir1a/file3.js");
```

###subdir1/subdir1a/file3.js
```
var file3 = function() {
    console.log("I'm a function from file3.js");
};

```

###subdir2/file4.js
```
var file4 = function() {
   console.log("I'm a function from file4.js");
};
```

Each of the above files is using an `//imports("pathToFile");` approach to include the contents of the imported file inline where the import comment existed. This plugin supports *nested import statements*, and allows you to reference the files *relatively* from the file doing the importing.

Running a gulpfile like this:

```
var gulp = require('gulp');
var gulpImports = require('gulp-imports');

gulp.task('imports', function() {
    gulp.src(['file1.js'])
        .pipe(gulpImports())
        .pipe(gulp.dest('./result'));
});

gulp.task('default', function() {
    gulp.run('imports');
});

```

would result in the following combined output:

```
var file1 = function() {
    console.log("I'm a function from file1.js");
};

var file2 = function() {
    console.log("I'm a function from file2.js");
};

var file2a = function() {
    console.log("I'm a function from file2a.js");
};

var file3 = function() {
    console.log("I'm a function from file3.js");
};

var file4 = function() {
   console.log("I'm a function from file4.js");
};

```

Yay for combining files via includes that *don't make your IDE barf*.

##Disclaimers
I'm sure there's a better way to do this - so if you know of one, tell me, or submit a PR :-)

In the meantime, I'll be trying to think of how to improve this to the point where I can bring myself to encourage others to use it.

##License
It's MIT. Have fun.