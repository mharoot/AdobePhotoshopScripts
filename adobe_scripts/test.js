// RUNNING MY SIDE TESTS IN THIS FILE
// php -S localhost:8081 -f index.php
function foo() {
    var context=this;
    var text = JSON.stringify(this)
    alert(text);
}

foo();