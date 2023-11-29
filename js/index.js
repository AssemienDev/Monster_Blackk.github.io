// Fonction pour vérifier le format du fichier lors de la sélection dans un champ de fichier
function verifierFormat(event) {
    // Récupérer l'élément d'entrée (input) qui a déclenché l'événement
    const input = event.target;

    // Récupérer le nom du fichier à partir de l'élément d'entrée
    const fileName = input.value;

    // Expression régulière pour définir les extensions de fichiers autorisées (jpg ou png)
    const allowedExtensions = /(\.jpg|\.png)$/i;

    // Vérifier si le nom du fichier correspond aux extensions autorisées
    if (!allowedExtensions.exec(fileName)) {

        // Afficher une boîte de dialogue d'erreur à l'aide de la bibliothèque Swal (SweetAlert)
        Swal.fire({
            title: 'Erreur',
            text: 'Format non pris en charge (Utiliser jpg ou png)',
            icon: 'error',
            confirmButtonText: 'OK'
        });

        // Réinitialiser la valeur de l'élément d'entrée (effacer le fichier sélectionné)
        input.value = "";

        // Indiquer que le format n'est pas pris en charge en retournant false
        return false;
    }
    generer(event)
    // Si le format est pris en charge, retourner true
    return true;
}


function generer(event) {
    // Empêcher le comportement par défaut du formulaire (rechargement )
    event.preventDefault(); 

    // Récupérer l'élément de l'image sur la page
    var newImage = document.getElementById('new');

    // Récupérer l'élément du fichier d'entrée
    var inputFile = document.getElementById('fichier');;
    
    // Vérifier si un fichier a été sélectionné
    if (inputFile.files && inputFile.files[0]) {

        // Créer un objet FileReader pour lire le contenu du fichier
        var reader = new FileReader();

        // Lorsque la lecture est terminée, mettre à jour la source de l'image
        reader.onload = function (e) {
            newImage.src = e.target.result;
        };
        reader.onerror = function (e) {
            alert("Une erreur s'est produite lors de la lecture du fichier.", e);
        };
        // Commencer la lecture du fichier en tant que Data URL
        reader.readAsDataURL(inputFile.files[0]);
        
        // Appeler la fonction pour générer et afficher l'image finale
        downloadImage(event);

    }
    // S'il n'y a pas de fichier sélectionné, vous pourriez vouloir gérer cette situation
    else {
        console.error("Aucun fichier sélectionné.");
    }
}


function downloadImage() {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var fondImage = document.getElementById('fond');
    var newImage = document.getElementById('new');
    var fond2Image = document.getElementById('fond2');


    // Assure que les images sont complètement chargées
    if ( fondImage.complete && newImage.complete && fond2Image.complete) {
        // Obtiens les dimensions de l'image de fond
        var fondWidth = fondImage.width;
        var fondHeight = fondImage.height;

        // Définir les dimensions du canvas en fonction de la taille de l'image de fond
        canvas.width = fondWidth;
        canvas.height = fondHeight;

        // Dessiner l'image de fond sur le canvas
        context.drawImage(fondImage, 0, 0, fondWidth, fondHeight);

        try{
        // Dessiner l'image "new" à l'intérieur de l'espace vide du fond
        var newImageX = 40;  
        var newImageY = 180; 
        var newImageWidth = 300; 
        var newImageHeight = 450; 
        context.drawImage(newImage, newImageX, newImageY, newImageWidth, newImageHeight);
            // Dessiner l'image "fond2" au-dessus de "new"
        context.drawImage(fond2Image, 0, 0, fondWidth, fondHeight);
        let partie1 = document.getElementById('nom').value;
        let partie2 = document.getElementById('prenom').value;
        let texte = partie1+" "+partie2
        var fontFamily = "Segoe UI";
        var textColor = "#010334";
        var backgroundColor =  "#39b54a";


        if(texte.length < 11 && texte.includes(" ")){
            // Position du texte
            var x = 111;
            var y = 575;
            var fontSize = 32;

            // Angle de rotation en radians (15 degrés dans cet exemple)
            var rotationAngle = -4 * Math.PI / 180;

            // Définir la couleur du fond
            context.fillStyle = backgroundColor;

            // Appliquer la rotation au rectangle de fond
            context.translate(x, y);
            context.rotate(rotationAngle);

            context.fillRect(-5, -fontSize, context.measureText(texte).width +100, fontSize + 10);
            context.rotate(-rotationAngle);


            context.translate(-x, -y);

            // Définir la police du texte
            context.font = fontSize + "px " + fontFamily;

            // Appliquer la rotation au texte
            context.translate(x, y);
            context.rotate(rotationAngle);

            // Définir la couleur du texte
            context.fillStyle = textColor;

            // Dessiner le texte sur le canvas
            context.fillText(texte, 0, 0);

            // Réinitialiser la transformation pour éviter des effets inattendus
            context.rotate(-rotationAngle);
            context.translate(-x, -y);


        }else if(texte.includes(" ")){
            var fontSize = 26;
            // Position du texte
            var x = 75;
            var y = 570;

            // Angle de rotation en radians (15 degrés dans cet exemple)
            var rotationAngle = -1 * Math.PI / 180;

            // Définir la couleur du fond
            context.fillStyle = backgroundColor;

            // Appliquer la rotation au rectangle de fond
            context.translate(x, y);
            context.rotate(rotationAngle);

            context.fillRect(-10, -fontSize, context.measureText(texte).width +170, fontSize + 10);
            context.translate(-x, -y);

            // Définir la police du texte
            context.font = fontSize + "px " + fontFamily;

            // Appliquer la rotation au texte
            context.translate(x, y);
            context.rotate(rotationAngle);

            // Définir la couleur du texte
            context.fillStyle = textColor;

            // Dessiner le texte sur le canvas
            context.fillText(texte, 0, 0);

            // Réinitialiser la transformation pour éviter des effets inattendus
            context.rotate(-rotationAngle);
            context.translate(-x, -y);
        }else{
            var fontSize = 25;
            // Position du texte
            var x = 130;
            var y = 575;

            // Angle de rotation en radians (15 degrés dans cet exemple)
            var rotationAngle = -1 * Math.PI / 180;

            // Définir la couleur du fond
            context.fillStyle = backgroundColor;

            // Appliquer la rotation au rectangle de fond
            context.translate(x, y);
            context.rotate(rotationAngle);

            context.fillRect(-10, -fontSize, context.measureText(texte).width +70, fontSize + 10);
            context.translate(-x, -y);

            // Définir la police du texte
            context.font = fontSize + "px " + fontFamily;

            // Appliquer la rotation au texte
            context.translate(x, y);
            context.rotate(rotationAngle);

            // Définir la couleur du texte
            context.fillStyle = textColor;

            // Dessiner le texte sur le canvas
            context.fillText(texte, 0, 0);

            // Réinitialiser la transformation pour éviter des effets inattendus
            context.rotate(-rotationAngle);
            context.translate(-x, -y);
        }

        // Convertir le canvas en une image au format data URL
        var dataUrl = canvas.toDataURL('defvest-2023/png');

        //sauvegarder l'image en local
        localStorage.setItem('imageData', dataUrl);

        //sauvegarder le nom en local
        localStorage.setItem('texteData', partie1);

         //Après un délai de 1000 millisecondes (5 secondes), rediriger vers "page2.html"
         setTimeout(function() {
         window.location.href = "page2.html";
         }, 1000);

        }catch(error){
            
        }
        
    }
    }

    
