INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) VALUES ('Terrario colgante', 'lorem', 'assets\img\productos\terrario-colgante.jpg', 250, 1, 9, 'todo el día', '1 vez por semana', '15x10x16.5cm',3);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) VALUES ('Lithop', 'lorem', 'assets\img\productos\lithop.jpg', 380, 1, 6, '7:00am-9:00am', '1 vez por semana', '8x8x12cm ', 11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) VALUES ('Echeveria Neon Breakers', 'lorem', 'assets\img\productos\neon.jpg', 220, 3, 20, '7:00am-11:00am', '2 veces por semana', '10x8x12cm ', 6);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) VALUES ('Echeveria Super Boom', 'lorem', 'assets\img\productos\super-bum.jpg', 220, 2, 12, '7:00am-11:00am', '2 veces por semana', '8x12cm', 1);

INSERT INTO public.especie(descripcion, genero_idgenero)VALUES ('Opuntia microdasys', 111);
INSERT INTO public.especie(descripcion, genero_idgenero)VALUES ('Lithop',16 );
INSERT INTO public.especie(descripcion, genero_idgenero)VALUES ('Echeveria Neon Breakers', 32);
INSERT INTO public.especie(descripcion, genero_idgenero)VALUES ('Echeveria Super Boom', 32);

INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (1, 31);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (2, 32);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (3, 33);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (4, 34);

INSERT INTO imagenproducto(url)VALUES ('URL1');
INSERT INTO imagenproducto(url)VALUES ('URL2');
INSERT INTO imagenproducto(url)VALUES ('URL3');

INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (1, 1);
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (1, 2);
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (1, 3);

INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) VALUES ('Terrario colgante', 'lorem', 'assets\img\productos\terrario-colgante.jpg', 250, 1, 9, 'todo el día', '1 vez por semana', '15x10x16.5cm',3);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) VALUES ('Lithop', 'lorem', 'assets\img\productos\lithop.jpg', 380, 1, 6, '7:00am-9:00am', '1 vez por semana', '8x8x12cm ', 11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) VALUES ('Echeveria Neon Breakers', 'lorem', 'assets\img\productos\neon.jpg', 220, 3, 20, '7:00am-11:00am', '2 veces por semana', '10x8x12cm ', 6);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) VALUES ('Echeveria Super Boom', 'lorem', 'assets\img\productos\super-bum.jpg', 220, 2, 12, '7:00am-11:00am', '2 veces por semana', '8x12cm', 1);

INSERT INTO public.promocion(	descripcion, fechainicio, fechafin, porcentajedescuento)VALUES ('PROMO1', current_date, current_date+2, 20 );
INSERT INTO public.promocion(	descripcion, fechainicio, fechafin, porcentajedescuento)VALUES ('PROMO2', current_date, current_date+2, 30 );
INSERT INTO public.promocion(	descripcion, fechainicio, fechafin, porcentajedescuento)VALUES ('PROMO3', current_date, current_date+2, 40 );
INSERT INTO public.promocion(	descripcion, fechainicio, fechafin, porcentajedescuento)VALUES ('PROMO4', current_date, current_date+2, 50 );

INSERT INTO public.promocion_has_producto(promocion_idpromocion, producto_idproducto)VALUES (1, 1);
INSERT INTO public.promocion_has_producto(promocion_idpromocion, producto_idproducto)VALUES (2, 2);
INSERT INTO public.promocion_has_producto(promocion_idpromocion, producto_idproducto)VALUES (3, 3);
INSERT INTO public.promocion_has_producto(promocion_idpromocion, producto_idproducto)VALUES (4, 4);
INSERT INTO public.promocion_has_producto(promocion_idpromocion, producto_idproducto)VALUES (1, 5);
INSERT INTO public.promocion_has_producto(promocion_idpromocion, producto_idproducto)VALUES (2, 6);
INSERT INTO public.promocion_has_producto(promocion_idpromocion, producto_idproducto)VALUES (3, 7);
INSERT INTO public.promocion_has_producto(promocion_idpromocion, producto_idproducto)VALUES (4, 8);
	


