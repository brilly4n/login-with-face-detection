
(function ($) {
    "use strict";


    $('#check').on('click', (e) => {

        $('#modal_face').modal('show')
        $('#show').html('Loading...')

        Promise.all([

            faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri('../models'),

        ]).then(() => {

            console.log("model loaded...")

            // start the video
            if(navigator.mediaDevices.getUserMedia){

                navigator.mediaDevices.getUserMedia({video: true})
                .then(stream => {

                    video.srcObject = stream
                })
            }
        })
    })


    video.addEventListener('play', async () => {
        
        $('#show').html(`
            <center>
                <img src="login/images/face.gif" style="width: 100%; margin-bottom:20px">
                <p>Hadapkan wajah kamu di depan layar</p>
            </center>
        `)
        // get label image dulu di folder image
        const labeledImage = await getLabeledImages()
        const faceMatcher  = new faceapi.FaceMatcher(labeledImage, 0.55)

        setInterval(detectFace(faceMatcher), 1000)
    })

    async function detectFace(faceMatcher){

        const detections = await faceapi.detectAllFaces(video)
        .withFaceLandmarks().withFaceDescriptors()


        const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor))

        results.forEach((result, i) => {

            if(result._label !== 'unknown'){

                // success
                Swal.fire({
                  title: 'Success!',
                  text: 'Pengguna "' + result._label + '"" ditemukan !',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                })

                setTimeout(() => window.location = 'https://google.com', 2000)

                video.pause();
                video.currentTime = 0;

                $('#modal_face').modal('hide')
                clearInterval(detectFace);
            }else{


            }
        })
    }


    function getLabeledImages(){

        const labels = ['Brillyan Ilham']

        return Promise.all(

            labels.map(async data => {

                const descriptor = []

                const image = await faceapi.fetchImage('login/sample/'+data+'/1.jpg')
                const detection = await faceapi.detectSingleFace(image)
                .withFaceLandmarks().withFaceDescriptor()

                descriptor.push(detection.descriptor)

                return new faceapi.LabeledFaceDescriptors(data, descriptor)
            })
        )
    }


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);