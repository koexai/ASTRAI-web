import hashlib
import os

def calculate_file_hashes(directory_path, algorithm='sha256'):
    """Calculate all files hashes in a directory"""
    hash_func = getattr(hashlib, algorithm)
    results = {}
    
    for filename in os.listdir(directory_path):
        file_path = os.path.join(directory_path, filename)
        if os.path.isfile(file_path):
            file_hash = hash_func()
            with open(file_path, "rb") as f:
                for chunk in iter(lambda: f.read(4096), b""):
                    file_hash.update(chunk)
            results[filename] = file_hash.hexdigest()
    
    return results


hashesA1 = calculate_file_hashes("./resources/datasets/A1/")
hashesA2 = calculate_file_hashes("./resources/datasets/A2/")
print("direcotry A1")
for filename1, hash_value1 in hashesA1.items():
    print(f"{filename1}: {hash_value1}")

print()

print("directory A2")

for filename2, hash_value2 in hashesA2.items():
    print(f"{filename2}: {hash_value2}")
