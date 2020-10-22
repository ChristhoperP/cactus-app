

CREATE OR REPLACE FUNCTION SP_AGREGAR_USUARIO
(    
   IN p_nombre VARCHAR(45),	 
   IN p_correo VARCHAR(45), 
   IN p_contrasenia VARCHAR(45),
   IN p_telefono VARCHAR(45),
   IN p_direccion VARCHAR(200),
   IN p_tipo_usuario INT,
   OUT p_ocurrioError INT,
   OUT p_mensaje VARCHAR(200),
   OUT p_id INT,
   OUT p_rol VARCHAR(45)
)
RETURNS RECORD AS $BODY$
DECLARE cantidad INT;  
BEGIN
   p_id = NULL;
   p_rol = NULL;
   IF(p_correo IS NULL OR p_contrasenia IS NULL OR p_nombre IS NULL) THEN
      p_ocurrioError := 1;
      p_mensaje:= 'Error: campos incompletos';
	  RETURN;
   ELSE  
	   SELECT COUNT(*) INTO cantidad
	   FROM usuario
	   WHERE correo=p_correo;
	   
	   IF (cantidad = 0 ) THEN
	     INSERT INTO usuario(
	       nombre,
           correo,
		   contrasenia,
           telefono, 
           direccion, 
           tipo_usuario_idtipo_usuario, 
           fecharegistro
         )
	     VALUES (
           p_nombre,
           p_correo,
	       p_contrasenia,
           p_telefono,
           p_direccion,
           p_tipo_usuario,
           current_date
        );
           p_ocurrioError := 0;
           p_mensaje:= 'Se ha registrado el usuario';
		   
         SELECT idusuario INTO p_id
		   FROM usuario
		   WHERE correo =  p_correo;

         SELECT rol INTO p_rol
		   FROM TipoUsuario
		   WHERE idTipoUsuario =  p_tipo_usuario;

		   RETURN;
		ELSE 
		   p_ocurrioError := 1;
           p_mensaje:= 'Error: Ya existe un usuario registrado con este correo';
		   RETURN;
	    END IF;   	
	END IF;	
END;
$BODY$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION SP_VALIDAR_USUARIO
(     
   IN p_correo VARCHAR(45),
   OUT p_id INT,
   OUT p_rol VARCHAR(45),
   OUT p_contrasenia VARCHAR(500),
   OUT p_ocurrioError INT,
   OUT p_mensaje VARCHAR(200)
)
RETURNS RECORD AS $BODY$
DECLARE cantidad INT;  
BEGIN
   p_id = NULL;
   p_rol = NULL;
   p_contrasenia = NULL;
   IF(p_correo IS NULL ) THEN
      p_ocurrioError := 1;
      p_mensaje:= 'Error: campos incompletos'
	  RETURN;
   ELSE  
	   SELECT COUNT(*) INTO cantidad
	   FROM usuario
	   WHERE  correo = p_correo;
	   
	   IF (cantidad != 0 ) THEN
	      SELECT idusuario, contrasenia INTO p_id, p_contrasenia
		  FROM usuario
		  WHERE correo = p_correo;

        SELECT u.idusuario, u.contrasenia, tu.rol INTO p_id, p_contrasenia, p_rol
		  FROM usuario u
		  INNER JOIN TipoUsuario tu on tu.idTipoUsuario=u.tipo_usuario_idtipo_usuario
		  WHERE correo = p_correo;
		 
		  p_ocurrioError := 0;
          p_mensaje:= 'El usuario existe';
	      RETURN;
	   ELSE 
		  p_ocurrioError := 1;
          p_mensaje:= 'Error: Usuario no registrado';
		  RETURN;
	   END IF;   	
	END IF;	
END;
$BODY$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION SP_OBTENER_VISITA_USUARIO
(  
   OUT p_visita INT,
   OUT p_usuario INT
)
RETURNS RECORD AS $BODY$ 
BEGIN
   p_visita = NULL;
   p_usuario = NULL;
   
   SELECT COUNT(*) INTO p_visita FROM VISITA
   WHERE EXTRACT(MONTH FROM fechavisita)=EXTRACT(MONTH FROM CURRENT_TIMESTAMP);

   SELECT COUNT(*) INTO p_usuario
		   FROM USUARIO;
		   
   RETURN;
END;
$BODY$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION SP_OBTENER_TIPOSBASES()
RETURNS SETOF "record" 
AS $$
DECLARE 
  r RECORD;
BEGIN
  FOR r IN SELECT idtipobase, descripcion
           FROM tipobase
           ORDER BY idtipobase
     LOOP
	    RETURN NEXT r;
	 END LOOP;
	 RETURN;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION SP_OBTENER_CATEGORIAS_PRODUCTOS()
RETURNS SETOF "record" 
AS $$
DECLARE 
  r RECORD;
BEGIN
  FOR r IN SELECT idcategoria, descripcion
           FROM categoria
           ORDER BY idcategoria
     LOOP
	    RETURN NEXT r;
	 END LOOP;
	 RETURN;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION SP_OBTENER_ESPECIES()
RETURNS SETOF "record" 
AS $$
DECLARE 
  r RECORD;
BEGIN
  FOR r IN SELECT A.idespecie, A.descripcion AS descripcion_especie,
                   B.idgenero, B.descripcion AS descripcion_genero,
                   C.idfamilia, C.descripcion AS descripcion_familia
           FROM especie AS A LEFT JOIN genero AS B ON A.Genero_idGenero = B.idgenero
           LEFT JOIN familia AS C on B.Familia_idFamilia = C.idFamilia
     LOOP
	    RETURN NEXT r;
	 END LOOP;
	 RETURN;
END;
$$
LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION SP_AGREGAR_ESPECIE
(    
   IN p_descripcionEspecie VARCHAR(200),	 
   IN p_idgenero INT, 
   OUT p_ocurrioError INT,
   OUT p_mensaje VARCHAR(200),
   OUT p_idespecie INT
)
RETURNS RECORD AS $BODY$
DECLARE cantidad INT;  
BEGIN
   p_idespecie = NULL;
   IF(p_descripcionEspecie IS NULL OR p_idgenero IS NULL) THEN
      p_ocurrioError := 1;
      p_mensaje:= 'Error: campos incompletos';
	  RETURN;
   ELSE  
	   SELECT COUNT(*) INTO cantidad
	   FROM especie
	   WHERE UPPER(p_descripcionEspecie) = UPPER(descripcion) ;
	   
	   IF (cantidad = 0 ) THEN
	     INSERT INTO especie(
	       descripcion,
           genero_idgenero
         )
	     VALUES (
           p_descripcionEspecie,
		   p_idgenero	 
        );
           p_ocurrioError := 0;
           p_mensaje:= 'Se ha registrado la especie';
		
         SELECT idespecie INTO p_idespecie
		 FROM especie
	     WHERE UPPER(p_descripcionEspecie) = UPPER(descripcion) ;

		 RETURN;
		ELSE 
		   p_ocurrioError := 1;
           p_mensaje:= 'Error: la especie ya se encuentra registrada';
		   RETURN;
	    END IF;   	
	END IF;	
END;
$BODY$
LANGUAGE 'plpgsql';

/* AGREGAR PRODUCTO */

CREATE OR REPLACE FUNCTION SP_AGREGAR_PRODUCTO_prueba
(    
   IN p_nombreproducto VARCHAR(45),	 
   IN p_categoria INT, 
   IN p_tipobase INT,
   IN p_especies INT,
   IN p_cantidad INT,
   IN p_precio DECIMAL,
   IN p_tiemposol VARCHAR(200),
   IN p_frecuenciariego VARCHAR(200),
   IN p_tamanio VARCHAR(200),
   IN p_descripcion VARCHAR(500),
   IN p_imagenportada VARCHAR(200),
   IN p_imagengaleria1 VARCHAR(200),
   IN p_imagengaleria2 VARCHAR(200),
   IN p_imagengaleria3 VARCHAR(200),
   OUT p_ocurrioError INT,
   OUT p_mensaje VARCHAR(200),
   OUT p_id INT
   
)
RETURNS RECORD AS $BODY$

    DECLARE cantidadpro INT;
	DECLARE vnIdProducto INT;
	DECLARE vnIdIMAGENPRODUCTO INT;
	DECLARE vnIdProducto2 INT;
	DECLARE vnIdIMAGENPRODUCTO2 INT;
	DECLARE vnIdProducto3 INT;
	DECLARE vnIdIMAGENPRODUCTO3 INT;
    
BEGIN
    p_id = NULL;

    
        
    /* IF EXISTS(SELECT * FROM IMAGENPRODUCTO) THEN
            SELECT max(idIMAGENPRODUCTO)+1 INTO vnIdIMAGENPRODUCTO FROM IMAGENPRODUCTO;
        ELSE
            vnIdIMAGENPRODUCTO:=1;
        END IF;  */ /* Se hizo una variable para idimagenproducto para poder usar en tabla producto has imagenproducto*/
  
   IF(p_nombreproducto IS NULL OR p_categoria IS NULL OR p_tipobase IS NULL OR p_especies IS NULL OR
   p_especies IS NULL OR p_cantidad IS NULL OR p_precio IS NULL OR p_descripcion IS NULL /* OR p_imagenportada IS NULL OR p_imagenesgaleria IS NULL */
   ) THEN
      p_ocurrioError := 1;
      p_mensaje:= 'Error: campos incompletos';
	  RETURN;
   ELSE  
	   SELECT COUNT(*) INTO cantidadpro
	   FROM producto
	   WHERE idproducto=vnIdProducto;  /* Que el id no se repita */

	   /* INSERT EN TABLA PRODUCTO */
	   IF (cantidadpro = 0 ) THEN
	     INSERT INTO producto(
	       nombre,
           informacionadicional,
		      urlportada,
           precio, 
           cantidad, 
           tipobase_idtipobase, 
           tiemposol, 
           frecuenciariego,
           tamanio,
           categoria_idcategoria
         )
	     VALUES (
           p_nombreproducto,
           p_descripcion,
	       p_imagenportada,
           p_precio,
           p_cantidad,
           p_tipobase,
           p_tiemposol,
           p_frecuenciariego,
           p_tamanio,
           p_categoria
        );

           p_ocurrioError := 0;
           p_mensaje:= 'Se ha registrado el producto';
        
		   
         SELECT idproducto INTO p_id
		   FROM producto        /* Se recupera el ID de Producto para mandarlo como respuesta*/
		   WHERE nombre=p_nombreproducto;
         
		   
		 
         SELECT max(idproducto) INTO vnIdProducto FROM producto;  /* Se obtiene el ID de Producto para insertar en tablas has*/
         SELECT max(idIMAGENPRODUCTO) INTO vnidIMAGENPRODUCTO FROM IMAGENPRODUCTO;  /* Se obtiene el ID de imagen para insertar en tablas has*/
       
         /* Se hace Insert en producto_has_especie */
         INSERT INTO producto_has_especie(
           producto_idproducto,
           especie_idespecie
         )
	     VALUES (
           vnIdProducto,
           p_especies
        );
		
		
        /* insertar imagenes */


       
            IF p_imagengaleria1 != '' THEN

                INSERT INTO imagenproducto
                (URL)
                VALUES
                (p_imagengaleria1);

                INSERT INTO producto_has_imagenproducto
                (
                producto_idproducto,
                imagenproducto_idimagenproducto
                )
                VALUES
                (
                    vnIdProducto,
                    vnIdIMAGENPRODUCTO
                    );
            END IF;

            SELECT max(idproducto) INTO vnIdProducto2 FROM producto;  /* Se obtiene el ID de Producto para insertar en tablas has*/
            SELECT max(idIMAGENPRODUCTO) INTO vnidIMAGENPRODUCTO2 FROM IMAGENPRODUCTO;  /* Se obtiene el ID de imagen para insertar en tablas has*/

            IF p_imagengaleria2 != '' THEN

                INSERT INTO imagenproducto
                (URL)
                VALUES
                (p_imagengaleria2);

                INSERT INTO producto_has_imagenproducto
                (
                producto_idproducto,
                imagenproducto_idimagenproducto
                )
                VALUES
                (
                    vnIdProducto2,
                    vnIdIMAGENPRODUCTO2
                    );
            END IF;

            SELECT max(idproducto) INTO vnIdProducto3 FROM producto;  /* Se obtiene el ID de Producto para insertar en tablas has*/
            SELECT max(idIMAGENPRODUCTO) INTO vnidIMAGENPRODUCTO3 FROM IMAGENPRODUCTO;  /* Se obtiene el ID de imagen para insertar en tablas has*/

            IF p_imagengaleria3 != '' THEN

                INSERT INTO imagenproducto
                (URL)
                VALUES
                (p_imagengaleria3);

                INSERT INTO producto_has_imagenproducto
                (
                producto_idproducto,
                imagenproducto_idimagenproducto
                )
                VALUES
                (
                    vnIdProducto3,
                    vnIdIMAGENPRODUCTO3
                    );
            END IF;

        
         

		   RETURN;
		ELSE 
		   p_ocurrioError := 1;
           p_mensaje:= 'Error: Ya existe un producto registrado con este nombre';
		   RETURN;
	    END IF;   	
	END IF;	
END;
$BODY$
LANGUAGE 'plpgsql';