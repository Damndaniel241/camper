import os
import base64
from cryptography.fernet import Fernet
from PIL import Image
from stegano import lsb

# Generate a Fernet key for encryption/decryption
key = Fernet.generate_key()
fernet = Fernet(key)

def encrypt_password(password):
    return fernet.encrypt(password.encode()).decode()

def decrypt_password(encrypted_password):
    return fernet.decrypt(encrypted_password.encode()).decode()

def embed_password(image_path, password, username):
    encrypted_password = encrypt_password(password)
    message = f"{username}:{encrypted_password}"
    stego_image = lsb.hide(image_path, message)
    stego_image.save(f"{image_path}_stego.png")

def extract_password(image_path):
    with Image.open(image_path) as img:
        data = lsb.reveal(img)
    data_parts = data.split(":")
    username = data_parts[0]
    encrypted_password = data_parts[1]
    return decrypt_password(encrypted_password), username

# Example usage
password = "my_password"
username = "my_username"
image_path = "path/to/image.png"

embed_password(image_path, password, username)
encrypted_password, username = extract_password(f"{image_path}_stego.png")
print(f"Extracted password: {encrypted_password}")
print(f"Extracted username: {username}")
print(f"Decrypted password: {decrypt_password(encrypted_password)}")