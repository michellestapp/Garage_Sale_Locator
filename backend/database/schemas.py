from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Car

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    contact_number = fields.String
    
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name", "email", "contact_number")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)
    
class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    contact_number = fields.String
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email", "contact_number")

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# Car Schemas
class CarSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    make = fields.String(required=True)
    model = fields.String(required=True)
    year = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "make", "model", "year", "user_id", "user")
    
    @post_load
    def create_car(self, data, **kwargs):
        return Car(**data)

car_schema = CarSchema()
cars_schema = CarSchema(many=True)


# TODO: Add your schemas below
class GarageSaleSchema(ma.Schema):
    id = fields.Integer(primary_key = True)
    date = fields.Date(required = True)
    start_time = fields.Time(required = True)
    end_time = fields.Time(required = True)
    street_address = fields.String(required = True)
    city = fields.String(required = True)
    state = fields.String(required = True)
    zip = fields.Integer(required = True)
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many = False)

    class Meta:
        fields = ("id", "date", "start_time", "end_time", "street_address", "city", "state", "zip", "user")

    @post_load
    def create_garage_sale(self, data, **kwargs):
        return GarageSale(**data)
    
    garage_sale_schema = GarageSaleSchema()
    garage_sales_schema = GarageSaleSchema (many=True)

class ItemSchema(ma.Schema):
    id = fields.Integer(primary_key = True)
    name_of_item = fields.String(required = True)
    description = fields.String()
    price = fields.Integer()
    category = fields.String()
    image = fields.String()
    gs_id = fields.Integer()
    garage_sale = ma.Nested(GarageSaleSchema, many=True)

    class Meta:
        fields = ("id","name_of_item", "description", "price", "category", "image", "gs_id")

    @post_load
    def create_item(self, data, **kwargs):
        return Item(**data)
    
    item_schema = ItemSchema()
    items_schema = ItemSchema (many=True)
