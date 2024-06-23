var imagedatauri;


function readURL(input){
    var reader = new FileReader();
    reader.onload = function(e){
        console.log(e.target.result);
        imagedatauri = e.target.result;
        document.querySelector('#image1').src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
}




function hideText(){
    console.log(steg.encode(document.querySelector('#text').value, imagedatauri));
}






