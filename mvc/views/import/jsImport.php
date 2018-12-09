<script src="<?php echo Host::getLocal();?>webfiles/js/service/PathUrl.js"></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/libs/sweetalert.min.js"></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/libs/materialize.min.js"></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/controller.js"></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/manager.js"></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/Host.js"></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/ElementProperty.js"></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/ConnectionServer.js"></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/Progress.js"></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/Position.js" ></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/Mask.js" ></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/DateService.js" ></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/EventTouche.js" ></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/Autocomplete.js" ></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/formatValue.js" ></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/service/ScreenShot.js" ></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/Session.js" ></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/DateCustom.js" ></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/SwalCustom.js"></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/ValidateForm.js" ></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/PreloaderCustomer.js" ></script>
<script src="<?php echo Host::getLocal();?>webfiles/js/utils/NetworkConnection.js" ></script>

<!-- import dynamic js in each page  -->
<?php if(isset($this->filesJs)) : ?>
    <?php foreach ($this->filesJs as $file) : ?>
        <script type="text/javascript" src="<?php echo Host::getLocal();?>webfiles/js/<?php echo $file ?>.js"></script>
    <?php endforeach; ?>
<?php endif; ?>
</body>
</html>