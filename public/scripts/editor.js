/**
 * Olivia: tinymce initial, remove image upload function
 */
tinymce.init({
    selector: 'textarea#tinymce-app',
    plugins: 'advlist autolink link lists charmap preview directionality emoticons fullscreen help save',
    menubar: 'edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | ltr rtl',
    block_unsupported_drop: false
  }); 
