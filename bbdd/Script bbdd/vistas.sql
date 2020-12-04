CREATE OR REPLACE VIEW INFORMACION_INVENTARIO AS
SELECT PR.IDPRODUCTO,PR.URLPORTADA,PR.NOMBRE, ES.DESCRIPCION as especie, PR.INFORMACIONADICIONAL, CAT.DESCRIPCION as categoria, PR.CANTIDAD, PR.PRECIO FROM PRODUCTO PR
INNER JOIN CATEGORIA CAT ON CAT.IDCATEGORIA=PR.CATEGORIA_IDCATEGORIA
INNER JOIN PRODUCTO_HAS_ESPECIE PRES ON PRES.PRODUCTO_IDPRODUCTO=PR.IDPRODUCTO
INNER JOIN ESPECIE ES ON ES.IDESPECIE=PRES.ESPECIE_IDESPECIE;

CREATE OR REPLACE VIEW CANTIDAD_INVENTARIO_POR_CATEGORIA AS
SELECT CAT.DESCRIPCION AS CATEGORIA, SUM(PR.CANTIDAD) AS CANTIDAD FROM PRODUCTO PR
INNER JOIN CATEGORIA CAT ON CAT.IDCATEGORIA=PR.CATEGORIA_IDCATEGORIA
WHERE PR.CANTIDAD>0
GROUP BY (CAT.DESCRIPCION);

CREATE OR REPLACE VIEW INFORMACION_USUARIO_PERFIL AS
select idusuario,imagenperfil,nombre,correo,
telefono,direccion from usuario;

CREATE OR REPLACE VIEW MODIFICAR_INVENTARIO AS
SELECT PR.IDPRODUCTO,PR.URLPORTADA,IP.URL as galeria,IP.IDIMAGENPRODUCTO AS idimagen ,PR.NOMBRE,TP.DESCRIPCION as TipoBase 
,ES.DESCRIPCION as especie, PR.INFORMACIONADICIONAL, CAT.DESCRIPCION as categoria, PR.CANTIDAD,
PR.PRECIO,PR.TAMANIO,PR.TIEMPOSOL,PR.FRECUENCIARIEGO FROM PRODUCTO PR
LEFT JOIN PRODUCTO_HAS_IMAGENPRODUCTO PRIM ON PRIM.PRODUCTO_IDPRODUCTO=PR.IDPRODUCTO
LEFT JOIN IMAGENPRODUCTO IP ON IP.IDIMAGENPRODUCTO=PRIM.IMAGENPRODUCTO_IDIMAGENPRODUCTO
INNER JOIN CATEGORIA CAT ON CAT.IDCATEGORIA=PR.CATEGORIA_IDCATEGORIA
INNER JOIN PRODUCTO_HAS_ESPECIE PRES ON PRES.PRODUCTO_IDPRODUCTO=PR.IDPRODUCTO
INNER JOIN ESPECIE ES ON ES.IDESPECIE=PRES.ESPECIE_IDESPECIE
INNER JOIN TIPOBASE TP ON TP.IDTIPOBASE = PR.TIPOBASE_IDTIPOBASE;

CREATE OR REPLACE VIEW INFORMACION_USUARIOS_REGISTRADOS AS
SELECT idusuario, nombre, correo, telefono, direccion, fecharegistro 
FROM USUARIO
WHERE tipo_usuario_idtipo_usuario = 2;

CREATE OR REPLACE VIEW INFORMACION_PROMOCIONES AS
SELECT A.promocion_idpromocion , B.idproducto , B.nombre , B.precio, C.porcentajedescuento, trunc((B.precio - (B.precio * C.porcentajedescuento)/100),2) AS precioConDescuento,C.fechafin, B.urlportada, D.idcategoria, D.descripcion AS nombreCategoria 
FROM promocion_has_producto AS A LEFT JOIN PRODUCTO AS B ON A.producto_idproducto = B.idproducto
LEFT JOIN promocion AS C ON A.promocion_idpromocion = C.idpromocion
LEFT JOIN categoria AS D ON B.categoria_idcategoria = D.idcategoria
ORDER BY A.promocion_idpromocion;

CREATE OR REPLACE VIEW INFORMACION_PRODUCTO AS
SELECT PR.IDPRODUCTO,PR.URLPORTADA,PR.NOMBRE, ES.DESCRIPCION as especie, GE.DESCRIPCION as Genero, FA.DESCRIPCION as Familia, PR.INFORMACIONADICIONAL, CAT.DESCRIPCION as categoria, PR.CANTIDAD, PR.PRECIO FROM PRODUCTO PR
INNER JOIN CATEGORIA CAT ON CAT.IDCATEGORIA=PR.CATEGORIA_IDCATEGORIA
INNER JOIN PRODUCTO_HAS_ESPECIE PRES ON PRES.PRODUCTO_IDPRODUCTO=PR.IDPRODUCTO
INNER JOIN ESPECIE ES ON ES.IDESPECIE=PRES.ESPECIE_IDESPECIE
INNER JOIN GENERO GE ON GE.IDGENERO=ES.GENERO_IDGENERO
INNER JOIN FAMILIA FA ON FA.IDFAMILIA=GE.FAMILIA_IDFAMILIA;

CREATE OR REPLACE VIEW DETALLE_PRODUCTO AS
SELECT PR.IDPRODUCTO,PR.NOMBRE,PR.URLPORTADA,IP.URL as galeria,IP.IDIMAGENPRODUCTO AS idimagen,PR.CANTIDAD,PR.PRECIO,TP.DESCRIPCION as TipoBase 
,ES.DESCRIPCION as especie, PR.INFORMACIONADICIONAL, CAT.DESCRIPCION as categoria,PR.TAMANIO,PR.TIEMPOSOL,PR.FRECUENCIARIEGO FROM PRODUCTO PR
LEFT JOIN PRODUCTO_HAS_IMAGENPRODUCTO PRIM ON PRIM.PRODUCTO_IDPRODUCTO=PR.IDPRODUCTO
LEFT JOIN IMAGENPRODUCTO IP ON IP.IDIMAGENPRODUCTO=PRIM.IMAGENPRODUCTO_IDIMAGENPRODUCTO
INNER JOIN CATEGORIA CAT ON CAT.IDCATEGORIA=PR.CATEGORIA_IDCATEGORIA
INNER JOIN PRODUCTO_HAS_ESPECIE PRES ON PRES.PRODUCTO_IDPRODUCTO=PR.IDPRODUCTO
INNER JOIN ESPECIE ES ON ES.IDESPECIE=PRES.ESPECIE_IDESPECIE
INNER JOIN TIPOBASE TP ON TP.IDTIPOBASE = PR.TIPOBASE_IDTIPOBASE;

 CREATE OR REPLACE VIEW PRODUCTOS_Y_PROMOCIONES AS
 SELECT A.idproducto,  A.urlportada, A.nombre, A.cantidad,  
 A.precio, C.porcentajedescuento, trunc((A.precio - (A.precio * C.porcentajedescuento)/100),2) AS precioConDescuento		   
 FROM PRODUCTO AS A  LEFT JOIN promocion_has_producto AS B ON A.idproducto = B.producto_idproducto 
 LEFT JOIN promocion AS C ON B.promocion_idpromocion = C.idpromocion;

 CREATE OR REPLACE VIEW pedidos_usuarios_admin AS
SELECT A.idpedido, A.fechapedido, A.total,
        A.estado, B.idusuario, B.nombre AS nombre_usuario
FROM pedido A LEFT JOIN usuario B ON A.usuario_idusuario = B.idusuario;

CREATE OR REPLACE VIEW reporte_usuario AS
SELECT us.idusuario, us.nombre, us.correo, us.telefono, us.direccion, us.fecharegistro,pe.idpedido,pe.fechapedido 
FROM pedido pe LEFT JOIN usuario us ON pe.usuario_idusuario = us.idusuario
WHERE tipo_usuario_idtipo_usuario = 2;

CREATE OR REPLACE VIEW reporte_ventas AS
SELECT C.idproducto, C.nombre AS nombre_producto, A.fechapedido, B.precioproducto AS precio_venta, 
        B.cantidad AS cantidad_vendida, D.descripcion AS categoria, E.descripcion AS tipobase,
	G.descripcion AS especie, H.idusuario, H.nombre AS nombre_usuario
FROM pedido AS A LEFT JOIN pedido_has_producto AS B ON A.idpedido = B.pedido_idpedido 
LEFT JOIN producto AS C ON B.producto_idproducto = C.idproducto
LEFT JOIN categoria AS D ON C.categoria_idcategoria = D.idcategoria
LEFT JOIN tipobase AS E ON C.tipobase_idtipobase = E.idtipobase
LEFT JOIN producto_has_especie AS F ON C.idproducto = F.producto_idproducto
LEFT JOIN especie AS G ON F.especie_idespecie = G.idespecie
LEFT JOIN usuario AS H ON A.usuario_idusuario = H.idusuario;


CREATE OR REPLACE VIEW ingresos_por_mes AS
SELECT to_char(fechapedido, 'YYYY-MM') AS fecha, sum(total) AS ventas_mes
FROM pedido
GROUP BY fecha;