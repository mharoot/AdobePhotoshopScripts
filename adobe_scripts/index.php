<style>
.wrapper {
    display: block;
}

#sidebar {
    min-width: 250px;
    max-width: 250px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    /* top layer */
    z-index: 9999;
}

.overlay {
    display: none;
    position: fixed;
    /* full screen */
    width: 100vw;
    height: 100vh;
    /* transparent black */
    background: rgba(0, 0, 0, 0.7);
    /* middle layer, i.e. appears below the sidebar */
    z-index: 998;
    opacity: 0;
    /* animate the transition */
    transition: all 0.5s ease-in-out;
}
/* display .overlay when it has the .active class */
.overlay.active {
    display: block;
    opacity: 1;
}

#dismiss {
    width: 35px;
    height: 35px;
    position: absolute;
    /* top right corner of the sidebar */
    top: 10px;
    right: 10px;
}
</style>
<div class="wrapper">
    <!-- Sidebar -->
    <nav id="sidebar">

        <div id="dismiss">
            <i class="fas fa-arrow-left"></i>
        </div>

        <div class="sidebar-header">
            <h3>Bootstrap Sidebar</h3>
        </div>

        <ul class="list-unstyled components">
            <p>Dummy Heading</p>
            <li class="active">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Home</a>
                <ul class="collapse list-unstyled" id="homeSubmenu">
                    <li>
                        <a href="#">Home 1</a>
                    </li>
                    <li>
                        <a href="#">Home 2</a>
                    </li>
                    <li>
                        <a href="#">Home 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">About</a>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
                <ul class="collapse list-unstyled" id="pageSubmenu">
                    <li>
                        <a href="#">Page 1</a>
                    </li>
                    <li>
                        <a href="#">Page 2</a>
                    </li>
                    <li>
                        <a href="#">Page 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">Portfolio</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>
    </nav>

    <!-- Page Content -->
    <div id="content">

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">

                <button type="button" id="sidebarCollapse" class="btn btn-info">
                    <i class="fas fa-align-left"></i>
                    <span>Toggle Sidebar</span>
                </button>
            </div>
        </nav>
    </div>
    <!-- Dark Overlay element -->
    <div class="overlay"></div>
</div>
<script>
// RUNNING MY SIDE TESTS IN THIS FILE
// php -S localhost:8081 -f index.php

var order = {"_id":"5b2202b28a8bfd1d1b650ba1",
"order_id":"1",
"status":"generating",
"billing_phone":"310-980-6482",
"shipping_first_name":"Amr",
"shipping_last_name":"Saemaldahr",
"shipping_address":"6400 Crescent Park East",
"shipping_postcode":"90094",
"shipping_city":"Playa Vista",
"shipping_state":"CA",
"shipping_country":"US",
"shipping_company":"self",
"ited_id":"200",
"item_name":"3C_ASD166992632 - Commercial Type II",
"item_meta":{
    "Wall Height":"5",
    "Wall Width":"5",
    "PATTERN SCALE":"100",
    "Texture Effect":"woodgrain",
    "3D Effect":"On",
    "Aging Effect":"Lived-in",
    "COLOR 3":"#83a530",
    "COLOR 2":"#af6b46",
    "COLOR 1":"#c9a566"}
}

var str = order["item_name"];
var index = str.indexOf('Commercial Type');
var substr = str.substring(index, str.length);
$(document).ready(function () {
        $("#sidebar").mCustomScrollbar({
            theme: "minimal"
        });

        $('#dismiss, .overlay').on('click', function () {
            // hide sidebar
            $('#sidebar').removeClass('active');
            // hide overlay
            $('.overlay').removeClass('active');
        });

        $('#sidebarCollapse').on('click', function () {
            // open sidebar
            $('#sidebar').addClass('active');
            // fade in the overlay
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
    });
</script>