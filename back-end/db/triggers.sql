\c lonline;

CREATE OR REPLACE FUNCTION create_cart_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO cart (cart_owner) VALUES (NEW.consid);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_cart_after_user_insert
AFTER INSERT ON consumers
FOR EACH ROW EXECUTE FUNCTION create_cart_for_new_user();