from flask import request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, GarageSale, Item
from database.schemas import items_schema, item_schema
from flask_cors import CORS
from flask import Flask
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from werkzeug.utils import secure_filename
import os
from flask import send_from_directory

class ImageResource(Resource):
    def get(self, filename):
        return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)
