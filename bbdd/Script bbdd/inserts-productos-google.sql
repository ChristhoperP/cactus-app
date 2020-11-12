INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Terrario colgante', 'lorem', 'colgante.jpg', 250, 1, 9, 'todo el día', '1 vez por semana', '15x10x16.5cm',3);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Lithop', 'lorem', 'lithop.jpg', 380, 1, 6, '7:00am-9:00am', '1 vez por semana', '8x8x12cm ', 11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Echeveria Neon Breakers', 'lorem', 'neon.jpg', 220, 3, 20, '7:00am-11:00am', '2 veces por semana', '10x8x12cm ', 6);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria)
 VALUES ('Echeveria Super Boom', 'lorem', 'super.jpg', 220, 2, 12, '7:00am-11:00am', '2 veces por semana', '8x12cm', 1);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Monadenium ritchiei variegata', 'lorem', 'monadenium.jpg', 200, 1, 6, '7:00am - 10:am y 5:00pm en adelante', '2 veces por semana', '15x10x16.5cm',11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Kalanchoe thyrsiflora', 'lorem', 'kalanchoe.jpg', 150, 1, 6, '7:00am - 10:am y 5:00pm en adelante', '2 veces por semana', '8x8x12cm ', 11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Crassula perforata', 'lorem', 'perforata.jpg', 140, 1, 6, '7:00am - 10:am y 5:00pm en adelante', '3 veces por semana', '8x8x12cm ', 11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Crassula brides bouquet', 'lorem', 'bouquet.jpg', 150, 3, 6, '7:00am - 10:am y 5:00pm en adelante', '3 veces por semana', '10x8x12cm ', 11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria)
 VALUES ('Injerto sulcorebutia rauschii', 'lorem', 'injerto.jpg', 280, 2, 12, '7:00am - 10:am y 5:00pm en adelante', '1 vez por semana', '8x12cm', 1);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Astrophytum myriostigma Quadricostatum', 'lorem', 'astro.jpg', 300, 1, 6, '7:00am - 10:am y 5:00pm en adelante', '1 vez por semana', '15x10x16.5cm',11);
INSERT INTO public.producto(nombre, informacionadicional, urlportada, precio, cantidad, tipobase_idtipobase, tiemposol, frecuenciariego, tamanio, categoria_idcategoria) 
VALUES ('Haworthia limifolia', 'lorem', 'haworthia.jpg', 130, 1, 6, '7:00am - 10:am y 5:00pm en adelante', '3 veces por semana', '8x8x12cm ', 11);


INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (1, 38);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (2, 39);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (3, 40);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (4, 41);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (5, 31);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (6, 32);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (7, 33);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (8, 34);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (9, 35);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (10, 36);
INSERT INTO public.producto_has_especie(producto_idproducto, especie_idespecie)VALUES (11, 37);

INSERT INTO imagenproducto(url)VALUES ('colgante-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('colgante-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('colgante-3.jpg');
INSERT INTO imagenproducto(url)VALUES ('lithop-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('lithop-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('neon-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('neon-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('neon-3.jpg');
INSERT INTO imagenproducto(url)VALUES ('super-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('super-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('monadenium-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('monadenium-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('monadenium-3.jpg');
INSERT INTO imagenproducto(url)VALUES ('kalanchoe-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('kalanchoe-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('kalanchoe-3.jpg');
INSERT INTO imagenproducto(url)VALUES ('perforata-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('bouquet-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('bouquet-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('bouquet-3.jpg');
INSERT INTO imagenproducto(url)VALUES ('injerto-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('injerto-2.jpg');
INSERT INTO imagenproducto(url)VALUES ('astro-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('haworthia-1.jpg');
INSERT INTO imagenproducto(url)VALUES ('haworthia-2.jpg');





INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (1, 1);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (1, 2);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (1, 3);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (2, 4);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (2, 5);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (3, 6);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (3, 7);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (3, 8);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (4, 9);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (4, 10);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (5, 11);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (5, 12);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (5, 13);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (6, 14);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (6, 15);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (6, 16);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (7, 17);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (8, 18);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (8, 19);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (8, 20);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (9, 21);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (9, 22);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (10, 23);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (11, 24);  
INSERT INTO producto_has_imagenproducto(producto_idproducto, imagenproducto_idimagenproducto)VALUES (11, 25);  

