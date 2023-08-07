from flask import Flask, request, send_from_directory,url_for, redirect
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_migrate import Migrate
from database.models import db
from database.schemas import ma
from resources.auth import LoginResource, RegisterResource
from resources.cars import AllCarResource, UserCarResource, TestResource
from resources.garage_sale import GarageSaleListResource, AllGarageSaleResource, GarageSaleResource, GarageSaleEditResource
from resources.item import ItemResource, ItemListResource, AllItemListResource, ItemImageResource 
from resources.image import ImageResource
from dotenv import load_dotenv
from os import environ
import os

# Adds variables from .env file to environment
load_dotenv()

# Creates instances of additional libraries
bcrypt = Bcrypt()
jwt= JWTManager()
cors = CORS()
migrate = Migrate()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static/images')

def create_app():
    """
    App factory that creates app instance
    """
    # Creates app instance
    app = Flask(__name__, static_url_path='/static')
   

    # Loads config properties from .env file
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')
    app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY')
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    

    

    # Registers all routes with API
    api = create_routes()

    # Registers Flask app with additional libraries created/imported above
    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    api.init_app(app)
    migrate.init_app(app, db)

    return app


def create_routes():
    """
    Creates Flask Restful instance and registers all Resource routes
    """
    api = Api()
    api.add_resource(RegisterResource, '/api/auth/register')
    api.add_resource(LoginResource, '/api/auth/login')
    api.add_resource(AllCarResource, '/api/cars')
    api.add_resource(UserCarResource, '/api/user_cars')
    api.add_resource(AllGarageSaleResource,'/api/garage_sales/all')
    api.add_resource(GarageSaleListResource, '/api/garage_sales')
    api.add_resource(GarageSaleResource, '/api/garage_sales/<int:garage_sale_id>')
    api.add_resource(AllItemListResource,'/api/user_items')
    api.add_resource(ItemListResource,'/api/user_items/<int:garage_sale_id>')
    api.add_resource(ItemResource,'/api/items/<int:item_id>')
    api.add_resource(ItemImageResource,'/api/items/<int:item_id>/image')
    api.add_resource(ImageResource,'/api/images/<filename>')
    api.add_resource(GarageSaleEditResource, '/api/edit_sale/<int:garage_sale_id>')
    api.add_resource(TestResource, '/api/test')    
    return api

app = create_app()
