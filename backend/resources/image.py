from flask import request, current_app
from flask_restful import Resource
from flask import send_from_directory

class ImageResource(Resource):
    def get(self, filename):
        return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)
