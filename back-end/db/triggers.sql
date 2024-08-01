\c lonline;

CREATE OR REPLACE FUNCTION create_order_if_ordered()
RETURNS TRIGGER AS $$
BEGIN
    -- Check for INSERT or UPDATE where ordered is true
    IF (TG_OP = 'INSERT' AND NEW.ordered = TRUE) OR
       (TG_OP = 'UPDATE' AND NEW.ordered = TRUE AND OLD.ordered = FALSE) THEN
        -- Insert a new order
        INSERT INTO orders (distributors_id, cart_products_id)
        VALUES (
            (SELECT distributor_id FROM products WHERE id = NEW.products_id),
            NEW.cart_product_id
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_create_order
AFTER INSERT OR UPDATE ON cart_products
FOR EACH ROW
EXECUTE FUNCTION create_order_if_ordered();
