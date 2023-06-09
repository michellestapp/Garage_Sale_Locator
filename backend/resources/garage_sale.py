from flask import request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, GarageSale, Item
from database.schemas import garage_sales_schema, garage_sale_schema,items_schema, item_schema
from flask_cors import CORS
from flask import Flask
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from werkzeug.utils import secure_filename
import os


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class AllGarageSaleResource(Resource):
    def get(self):
        garage_sales = GarageSale.query.all()
        return garage_sales_schema.dump(garage_sales)
    
class GarageSaleListResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_garage_sales = GarageSale.query.filter_by(user_id = user_id)
        return garage_sales_schema.dump(user_garage_sales), 200
    
    @jwt_required()
    def post(self):
        try:
            user_id = get_jwt_identity()
            form_data = request.get_json()
            new_garage_sale = garage_sale_schema.load(form_data)
            new_garage_sale.user_id = user_id
            db.session.add(new_garage_sale)
            db.session.commit()
            return garage_sale_schema.dump(new_garage_sale), 201
        except ValidationError as err:
            return err.messages, 400
    
class GarageSaleResource(Resource):
    @jwt_required()
    def put(self,garage_sale_id):
        user_id = get_jwt_identity()
        
        edit_garage_sale = GarageSale.query.get_or_404(garage_sale_id)
        if int(user_id) == edit_garage_sale.user_id:
            if "date" in request.json:
                edit_garage_sale.date = request.json["date"]
            if "start_time" in request.json:
                edit_garage_sale.start_time = request.json["start_time"]
            if "end_time"in request.json:
                edit_garage_sale.end_time = request.json["end_time"]
            if "street_address" in request.json:
                edit_garage_sale.street_address = request.json["street_address"]
            if "city" in request.json:
                edit_garage_sale.city = request.json["city"]
            if "state" in request.json:
                edit_garage_sale.state = request.json["state"]
            if "zip" in request.json:
                edit_garage_sale.zip = request.json["zip"]
            db.session.commit()
            return item_schema.dump(edit_garage_sale), 200
        return "Not authorized to change this sale", 403

    @jwt_required()
    def delete(self, garage_sale_id):
        user_id = get_jwt_identity()
        delete_garage_sale = GarageSale.query.get_or_404(garage_sale_id)
        if int(user_id) == delete_garage_sale.user_id:
            db.session.delete(delete_garage_sale)
            db.session.commit()
            return '',204
        return "Not autorized to delete this garage sale", 403

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
            if 'image' not in request.files:
                return 'no file', 404
            file = request.files['image']
            
            if file.filename == '':
                return 'filename empty', 404
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(current_app.config['UPLOAD_FOLDER'],filename))
                new_item = Item()
                new_item.name_of_item = request.form['name_of_item']
                new_item.description = request.form['description']
                new_item.price = request.form['price']
                new_item.category = request.form['category']
                new_item.image = filename
                new_item.garage_sale_id = garage_sale_id
                db.session.add(new_item)
                db.session.commit()
                return item_schema.dump(new_item), 201
            return '', 401
        return 'You are not the owner', 403



class ItemResource(Resource):
    @jwt_required()
    def put(self, item_id):
        user_id = get_jwt_identity()  
        edit_item = Item.query.get_or_404(item_id)
        garage_sale_locator = GarageSale.query.get_or_404(edit_item.garage_sale_id)
        user = garage_sale_locator.user_id
        print(user==user_id)
        if int(user_id) == user:
            if "name_of_item" in request.form:
                edit_item.name_of_item = request.form["name_of_item"]
            if "description" in request.form:
                edit_item.description = request.form["description"]
            if "price"in request.form:
                edit_item.price = request.form["price"]
            if "category" in request.form:
                edit_item.category = request.form["category"]
            if "image" in request.files:
                file = request.files['image']
                if 'image' not in request.files:
                    return 'no file', 404
                if file.filename == '':
                    return 'filename empty',404
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    file.save(os.path.join(current_app.config['UPLOAD_FOLDER'],filename))
                    edit_item.image = filename
            db.session.commit()
            return item_schema.dump(edit_item), 200
        return "You are not authorized to change this item", 403

    @jwt_required()
    def delete(self, item_id):
        user_id = get_jwt_identity()
        delete_item = Item.query.get_or_404(item_id)
        db.session.delete(delete_item)
        db.session.commit()
        return '',204
