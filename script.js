function drop(e) {
  e.stopPropagation()
  e.preventDefault()

  $('#text_info_upload').text('Drop')
}

$(function() {
  $('html').on('dragover', function(e) {
    e.preventDefault()
    e.stopPropagation()
    $('#text_info_upload').text('Drag here')
  })

  // dragenter or dragover
  $('.upload-area')
    .on('dragenter', (e) => drop(e))
    .on('dragover', (e) => drop(e))

  // drop 
  $('.upload-area').on('drop', function(e) {
    e.stopPropagation()
    e.preventDefault()
    var file = e.originalEvent.dataTransfer.files

    var formData = new FormData()
    formData.append('file', file[0])

    uploadData(formData)
  })

  $('#uploadfile').click(function() {
    $('#file').click()
  })

  $('#file').change(function() {
    $('#text_info_upload').text('Please wait')
    var fd = new FormData()

    var files = $('#file')[0].files[0]

    fd.append('file', files)

    uploadData(fd)
  })
})

function uploadData(formData) {
  $.ajax({
    xhr: function() {
      var xhr = new window.XMLHttpRequest()
      xhr.upload.addEventListener('progress', function(evt) {
        if (evt.lengthComputable) {
          progress = Math.round((evt.loaded / evt.total) * 100)
          $('.progress-bar').width(progress + '%')
        }
      })

      return xhr
    },
    url: 'upload.php',
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    dataType: 'json',
    beforeSend: function() {
      $('#text_info_upload').text('Uploading')
      $('.progress').show()
      $('.progress-bar').width('0%')
    },
    success: function(response) {
      $('#text_info_upload').text('Upload is successfully')

      // wait 5 seconds
      var result = new Promise(function(resolve) {
        setTimeout(function() {
          resolve('success')
        }, 5000)
      })

      result.then(function() {
          $('#text_info_upload').html('Drag and Drop file here<br/>or<br/>Click to select file')
          $('.progress').hide()
      })
    }
  })
}
