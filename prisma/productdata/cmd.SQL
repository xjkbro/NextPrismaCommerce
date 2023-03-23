SELECT TITLE as title, DESCR as description, FAKE_URL as slug, BIG_DESCR as specifications, QTY as quantity, IMAGE as image FROM `products` WHERE 1


SELECT A.TITLE as title, A.DESCR as description, A.FAKE_URL as slug, A.BIG_DESCR as specifications, A.QTY as quantity, A.IMAGE as image, B.PPRICE as price FROM `products` A LEFT OUTER JOIN `product_size` B ON A.ID = B.PROD_ID



SELECT A.TITLE as title, A.DESCR as description, A.FAKE_URL as slug, A.CAT_DESCR as short_description, A.BIG_DESCR as specifications, A.QTY as quantity, A.IMAGE as image, B.PPRICE as price FROM `products` A LEFT OUTER JOIN `product_size` B ON A.ID = B.PROD_ID