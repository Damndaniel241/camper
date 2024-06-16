import React, { useState } from 'react';

const ImageComparisonComponent = () => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);

    const handleImage1Change = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage1(imageUrl);
        }
    };

    const handleImage2Change = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage2(imageUrl);
        }
    };

    const compareImages = () => {
        if (!image1 || !image2) {
            alert("Please select both images.");
            return;
        }

        const img1 = new Image();
        const img2 = new Image();

        img1.src = image1;
        img2.src = image2;

        img1.onload = () => {
            img2.onload = () => {
                const canvas1 = document.createElement('canvas');
                const canvas2 = document.createElement('canvas');

                canvas1.width = img1.width;
                canvas1.height = img1.height;
                canvas2.width = img2.width;
                canvas2.height = img2.height;

                const ctx1 = canvas1.getContext('2d');
                const ctx2 = canvas2.getContext('2d');

                ctx1.drawImage(img1, 0, 0, img1.width, img1.height);
                ctx2.drawImage(img2, 0, 0, img2.width, img2.height);

                const imgData1 = ctx1.getImageData(0, 0, img1.width, img1.height).data;
                const imgData2 = ctx2.getImageData(0, 0, img2.width, img2.height).data;

                const areImagesEqual = compareImageData(imgData1, imgData2);
                if (areImagesEqual) {
                    alert("Images are the same.");
                } else {
                    alert("Images are different.");
                }
            };
        };
    };

    const compareImageData = (data1, data2) => {
        if (data1.length !== data2.length) return false;

        for (let i = 0; i < data1.length; i++) {
            if (data1[i] !== data2[i]) return false;
        }

        return true;
    };

    return (
        <div>
            <div className="mb-3">
                <label className="form-label">Image 1</label>
                <input type="file" accept="image/*" className="form-control" onChange={handleImage1Change} />
            </div>
            <div className="mb-3">
                <label className="form-label">Image 2</label>
                <input type="file" accept="image/*" className="form-control" onChange={handleImage2Change} />
            </div>
            <button type="button" className="btn btn-primary" onClick={compareImages}>
                Compare Images
            </button>
            {image1 && <img src={image1} alt="Image 1" style={{ width: '100px', height: '100px' }} />}
            {image2 && <img src={image2} alt="Image 2" style={{ width: '100px', height: '100px' }} />}
        </div>
    );
};

export default ImageComparisonComponent;
