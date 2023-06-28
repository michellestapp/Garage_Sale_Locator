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

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class AllItemListResource(Resource):
    def get(self):
        user_items = Item.query.all()
        return items_schema.dump(user_items, many=True), 200

class ItemListResource(Resource):
    @jwt_required()
    def get(self, garage_sale_id):
        user_items = Item.query.filter_by(garage_sale_id = garage_sale_id)
        return items_schema.dump(user_items, many=True), 200

    
    @jwt_required()
    def post(self,garage_sale_id):
        user_id = get_jwt_identity()
        garage_sale = GarageSale.query.get_or_404(garage_sale_id)

        if int(user_id) == garage_sale.user_id:

            form_data = request.get_json()
            new_item = item_schema.load(form_data)


            # new_item.name_of_item = request.form['name_of_item']
            # new_item.description = request.form['description']
            # new_item.price = request.form['price']
            # new_item.category = request.form['category']
            new_item.garage_sale_id = garage_sale_id
            
          
            db.session.add(new_item)
            db.session.commit()
            return item_schema.dump(new_item), 201
        return 'You are not the owner', 403



class ItemResource(Resource):
    @jwt_required()
    def put(self, item_id):
        user_id = get_jwt_identity()  
        edit_item = Item.query.get_or_404(item_id)
        garage_sale_locator = GarageSale.query.get_or_404(edit_item.garage_sale_id)
        user = garage_sale_locator.user_id
        if int(user_id) == user:
            if "name_of_item" in request.json:
                edit_item.name_of_item = request.json["name_of_item"]
            if "description" in request.json:
                edit_item.description = request.json["description"]
            if "price"in request.json:
                edit_item.price = request.json["price"]
            if "category" in request.json:
                edit_item.category = request.json["category"]
            # if "image" in request.files:
            #     file = request.files['image']
            #     if file and allowed_file(file.filename):
            #         filename = secure_filename(file.filename)
            #         file.save(os.path.join(current_app.config['UPLOAD_FOLDER'],filename))
            #         edit_item.image = filename                     
            #     else:
            #         filename = ''
            #         edit_item.image = filename
            db.session.commit()
            return item_schema.dump(edit_item), 200
        return "You are not authorized to change this item", 403

    @jwt_required()
    def delete(self, item_id):
        user_id = get_jwt_identity()
        delete_item = Item.query.get_or_404(item_id)
        garage_sale_locator = GarageSale.query.get_or_404(delete_item.garage_sale_id)
        user = garage_sale_locator.user_id
        if int(user_id) == user:
            db.session.delete(delete_item)
            db.session.commit()
            return '',204
        return "You are not authorized to delete this item", 403
    
class ItemImageResource(Resource):
    @jwt_required()
    def post(self, item_id):
        item = Item.query.get_or_404(item_id)
        file = request.files['image']
        if file and allowed_file(file.filename):
            if file.filename == '':
                return 'filename empty', 400
            filename = secure_filename(file.filename)
            item.image = filename
            file.save(os.path.join(current_app.config['UPLOAD_FOLDER'],filename))
            db.session.commit()
        return item_schema.dump(item), 200
