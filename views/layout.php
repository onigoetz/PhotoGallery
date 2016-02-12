<!DOCTYPE html>
<html>
<head>
	<title>Photo Gallery</title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">

    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <link rel="stylesheet" href="<?= BASE; ?>asset/css/app.min.css?<?=filemtime(ROOT.'/asset/css/app.min.css'); ?>"/>

    <script>
        window.baseURL = <?= json_encode(BASE) ?>;
    </script>
</head>
<body class="ui-loading">
    <?= $content; ?>

    <script type="text/javascript" src="<?= BASE; ?>asset/js/app.min.js?<?=filemtime(ROOT.'/asset/js/app.min.js'); ?>"></script>
</body>
</html>
