INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Terrario colgante', 'lorem', '50.jpg', 250, 1, 9, 'todo el día', '1 vez por semana', '15x10x16.5cm',3);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Lithop', 'lorem', '40.jpg', 380, 1, 6, '7:00am-9:00am', '1 vez por semana', '8x8x12cm ', 11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Echeveria Neon Breakers', 'lorem', '20.jpg', 220, 3, 20, '7:00am-11:00am', '2 veces por semana', '10x8x12cm ', 6);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria)
 VALUES ('Echeveria Super Boom', 'lorem', '42.jpg', 220, 2, 12, '7:00am-11:00am', '2 veces por semana', '8x12cm', 1);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Monadenium ritchiei variegata', 'lorem', '43.jpg', 200, 1, 6, '7:00am - 10:am y 5:00pm en adelante', '2 veces por semana', '15x10x16.5cm',3);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Kalanchoe thyrsiflora', 'lorem', '44.jpg', 150, 1, 6, '7:00am - 10:am y 5:00pm en adelante', '2 veces por semana', '8x8x12cm ', 11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Crassula perforata', 'lorem', '45.jpg', 140, 1, 6, '7:00am - 10:am y 5:00pm en adelante', '3 veces por semana', '8x8x12cm ', 11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Crassula brides bouquet', 'lorem', '46.jpg', 150, 3, 6, '7:00am - 10:am y 5:00pm en adelante', '3 veces por semana', '10x8x12cm ', 11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria)
 VALUES ('Injerto sulcorebutia rauschii', 'lorem', '26.jpg', 280, 2, 12, '7:00am - 10:am y 5:00pm en adelante', '1 vez por semana', '8x12cm', 12);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Astrophytum myriostigma Quadricostatum', 'lorem', '27.jpg', 300, 1, 6, '7:00am - 10:am y 5:00pm en adelante', '1 vez por semana', '15x10x16.5cm',11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Haworthia limifolia', 'lorem', '28.jpg', 130, 1, 6, '7:00am - 10:am y 5:00pm en adelante', '3 veces por semana', '8x8x12cm ', 11);


INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (50, 31);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (40, 32);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (20, 33);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (42, 34);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (43, 36);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (44, 37);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (45, 38);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (46, 39);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (26, 40);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (27, 41);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (28, 42);

INSERT INTO imagenproducto(url)VALUES ('50-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('50-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('50-3.jpg');
INSERT INTO imagenproducto(url)VALUES ('40-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('40-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('20-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('20-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('20-3.jpg');
INSERT INTO imagenproducto(url)VALUES ('42-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('42-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('43-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('43-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('43-3.jpg');
INSERT INTO imagenproducto(url)VALUES ('44-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('44-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('44-3.jpg');
INSERT INTO imagenproducto(url)VALUES ('45-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('46-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('46-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('46-3.jpg');
INSERT INTO imagenproducto(url)VALUES ('26-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('26-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('27-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('28-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('28-2.jpg');





INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES 39, 35);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES 39, 36);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES 39, 37);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (40, 38);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (40, 39);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (20, 40);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (20, 41);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (20, 42);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (21, 43);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (21, 44);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (22, 45);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (22, 46);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (22, 47);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (23, 48);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (23, 49);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (23, 50);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (45, 51);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (25, 52);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (25, 53);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (25, 54);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (26, 55);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (26, 56);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (27, 57);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (28, 58);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (28, 59);  

