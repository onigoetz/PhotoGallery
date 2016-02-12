<?php include __DIR__ . '/_breadcrumb.php'; ?>

<div id="gallery"></div>

<script>
    window.scriptLoaded = function() {
        var gallery = <?= json_encode($book) ?>;
        var element = window.React.createElement(window.Gallery, {photos: gallery});
        window.ReactDOM.render(element, document.getElementById("gallery"));
    }
</script>
