from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, GarageSale, Item
from database.schemas import garage_sales_schema, garage_sale_schema,items_schema, item_schema
from flask_cors import CORS
from flask import Flask
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError

class AllGarageSaleResource(Resource):
    def get(self):
        garage_sales = GarageSale.query.all()
        date = request.args.get('date')
        if date:
            garage_sales = GarageSale.query.filter_by(date=date)
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

    @jwt_required()
    def delete(self, garage_sale_id):
        user_id = get_jwt_identity()
        delete_garage_sale = GarageSale.query.get_or_404(garage_sale_id)
        db.session.delete(delete_garage_sale)
        db.session.commit()
        return '',204


class ItemListResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_items = Item.query.filter_by(user_id = user_id)
        return items_schema.dump(user_items), 200
    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json
        new_item = item_schema.load(form_data)
        new_item.user_id = user_id
        db.session.add(new_item)
        db.session.commit()
        serialized_item = item_schema.dump(new_item)
        return serialized_item, 201
    
class ItemResource(Resource):
    @jwt_required()
    def put(self, garage_sale_id):
        user_id = get_jwt_identity()
        edit_item = Item.query.get_or_404(garage_sale_id)
        if "name_of_item" in request.json:
            edit_item.name_of_item = request.json["name_of_item"]
        if "description" in request.json:
            edit_item.description = request.json["description"]
        if "price"in request.json:
            edit_item.price = request.json["price"]
        if "category" in request.json:
            edit_item.category = request.json["category"]
        if "image" in request.json:
            edit_item.image = request.json["image"]
        db.session.commit()
        return item_schema.dump(edit_item), 200

    @jwt_required()
    def delete(self, garage_sale_id):
        user_id = get_jwt_identity()
        delete_item = Item.query.get_or_404(garage_sale_id)
        db.session.delete(delete_item)
        db.session.commit()
        return '',204
