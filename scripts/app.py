from flask import Flask, request, jsonify
import json
import os
import sys
from flask_cors import CORS  # Import CORS

# Add the src directory to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from utils.filterProduct import filter_products  # Now this should work

app = Flask(__name__)
CORS(app)  # Apply CORS to the Flask app

def load_data():
    # Get the absolute path to the project directory
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_file_path = os.path.join(project_root, 'src', 'data', 'products.json')

    with open(json_file_path, 'r') as file:
        data = json.load(file)

    return data

@app.route('/recommend', methods=['POST'])
def recommend():
    inputs = request.json
    products = load_data()  # Load the data here

    # Perform your filtering logic with the loaded products and inputs
    filtered_products = filter_products(products, inputs)  # Now it's defined

    return jsonify(filtered_products)

if __name__ == '__main__':
    app.run(debug=True)
