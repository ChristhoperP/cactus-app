

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
   OUT p_idespecie INT,
   OUT p_nombreespecie VARCHAR (200)	
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
		
         SELECT idespecie, descripcion  INTO p_idespecie, p_nombreespecie
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

CREATE OR REPLACE FUNCTION SP_AGREGAR_PRODUCTO
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
        

		 
         SELECT max(idproducto) INTO vnIdProducto FROM producto;  /* Se obtiene el ID de Producto para insertar en tablas has*/
        
       
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
				
				 SELECT max(idIMAGENPRODUCTO) INTO vnidIMAGENPRODUCTO FROM IMAGENPRODUCTO;  /* Se obtiene el ID de imagen para insertar en tablas has*/

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
            

            IF p_imagengaleria2 != '' THEN

                INSERT INTO imagenproducto
                (URL)
                VALUES
                (p_imagengaleria2);
				
				SELECT max(idIMAGENPRODUCTO) INTO vnidIMAGENPRODUCTO2 FROM IMAGENPRODUCTO;  /* Se obtiene el ID de imagen para insertar en tablas has*/

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
            

            IF p_imagengaleria3 != '' THEN

                INSERT INTO imagenproducto
                (URL)
                VALUES
                (p_imagengaleria3);
				
				SELECT max(idIMAGENPRODUCTO) INTO vnidIMAGENPRODUCTO3 FROM IMAGENPRODUCTO;  /* Se obtiene el ID de imagen para insertar en tablas has*/

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

        
         
         SELECT max(idproducto) INTO p_id
		   FROM producto;     /* Se recupera el ID de Producto para mandarlo como respuesta*/
		  

		   RETURN;
		ELSE 
		   p_ocurrioError := 1;
           p_mensaje:= 'Error: Ya existe un producto registrado con este id';
		   RETURN;
	    END IF;   	
	END IF;	
END;
$BODY$
LANGUAGE 'plpgsql';

/* MODIFICAR PRODUCTO */

CREATE OR REPLACE FUNCTION sp_modificar_producto(
	p_idproducto INT,
	p_nombre VARCHAR(45),
	p_informacionadicional VARCHAR(500),
	p_urlportada VARCHAR(200),
	p_precio NUMERIC,
	p_cantidad INT,
	p_tipobase_idtipobase INT,
	p_tiemposol VARCHAR(45),
	p_frecuenciariego VARCHAR(45),
	p_tamanio VARCHAR(45),
	p_categoria_idcategoria INT,
	p_especies INT[],
	p_eliminadas INT[],
	p_imggaleria1 VARCHAR(200),
	p_imggaleria2 VARCHAR(200),
	p_imggaleria3 VARCHAR(200),
	OUT p_ocurrioerror INT,
	OUT p_mensaje VARCHAR(100)
)	
RETURNS record AS $BODY$
DECLARE idImagen1 INT;
DECLARE idImagen2 INT;
DECLARE idImagen3 INT;
BEGIN
	idImagen1 := NULL;
    idImagen2 := NULL;
    idImagen3 := NULL;
    IF (p_idproducto != NULL OR p_tipobase_idtipobase != NULL OR p_categoria_idcategoria  != NULL) THEN
           p_ocurrioError := 1;
           p_mensaje := "Error: campos incompletos";
		   RETURN;
     ELSE   
	    UPDATE producto
	    SET nombre=p_nombre, 
	    informacionadicional=p_informacionadicional, 
	    ---urlportada = p_urlportada,
	    precio = p_precio,
	    cantidad = p_cantidad, 
	    tipobase_idtipobase = p_tipobase_idtipobase ,
	    tiemposol = p_tiemposol , 
	    frecuenciariego= p_frecuenciariego, 
	    tamanio=p_tamanio , 
	    categoria_idcategoria = p_categoria_idcategoria
	    WHERE idproducto = p_idproducto ;
		---Especies 
		DELETE FROM PRODUCTO_HAS_ESPECIE
    	WHERE  producto_idproducto = p_idproducto ;

		IF (p_urlportada != '') THEN
			UPDATE producto
	    	SET urlportada = p_urlportada
			WHERE idproducto = p_idproducto;
		END IF;
		
		
		FOR i IN array_lower(p_especies,1).. array_upper(p_especies,1) LOOP
		   INSERT INTO producto_has_especie(producto_idproducto, especie_idespecie)
	              VALUES (p_idproducto, p_especies[i]);
		END LOOP;
		
		--Imagenes eliminadas 
		
		IF (array_length(p_eliminadas,1) <> 0) THEN  
		   FOR i IN array_lower(p_eliminadas,1).. array_upper(p_eliminadas,1) LOOP	  
		        DELETE FROM producto_has_imagenproducto
	            WHERE producto_idproducto = p_idproducto AND
		           imagenproducto_idimagenproducto = p_eliminadas[i];  
				   
		        DELETE FROM imagenproducto
	            WHERE idimagenproducto = p_eliminadas[i];		   
		    END LOOP;
		END IF;
				
	    IF (p_imggaleria1 != '' ) THEN
		    INSERT INTO imagenproducto(url)
	        VALUES (p_imggaleria1);
			
			SELECT idimagenproducto INTO idImagen1
	        FROM imagenproducto
			WHERE url = p_imggaleria1;
			
			INSERT INTO producto_has_imagenproducto(
	                producto_idproducto, imagenproducto_idimagenproducto)
	        VALUES (p_idproducto, idImagen1);
		 END IF;  

         IF (p_imggaleria2 != '' ) THEN
		    INSERT INTO imagenproducto(url)
	        VALUES (p_imggaleria2);
			
			SELECT idimagenproducto INTO idImagen2
	        FROM imagenproducto
			WHERE url = p_imggaleria2;
			
			INSERT INTO producto_has_imagenproducto(
	                producto_idproducto, imagenproducto_idimagenproducto)
	        VALUES (p_idproducto, idImagen2);
		  END IF;  
		
		   IF (p_imggaleria3 != '') THEN
		    INSERT INTO imagenproducto(url)
	        VALUES (p_imggaleria3);
			
			SELECT idimagenproducto INTO idImagen3
	        FROM imagenproducto
			WHERE url = p_imggaleria3;
			
			INSERT INTO producto_has_imagenproducto(
	                producto_idproducto, imagenproducto_idimagenproducto)
	        VALUES (p_idproducto, idImagen3);
		 END IF;  
	    p_ocurrioError := 0;
        p_mensaje := 'Campos actualizados';
        RETURN;
    END IF;     
END;
$BODY$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION sp_modificar_usuario(
	IN p_idusuario INT,
    IN p_nombre VARCHAR(45), 
    IN p_contrasenia VARCHAR(100),
    IN p_telefono  VARCHAR(45),
    IN p_direccion VARCHAR(200),
    IN p_imagenperfil VARCHAR(200),	
	OUT p_ocurrioerror INT,
	OUT p_mensaje VARCHAR(100)
)	
RETURNS record AS $BODY$
DECLARE 
BEGIN
    IF (p_idusuario != NULL OR p_nombre != NULL OR p_contrasenia != NULL) THEN
           p_ocurrioError := 1;
           p_mensaje := "Error: campos incompletos";
		   RETURN;
     ELSE   
	    UPDATE usuario
     SET nombre=p_nombre, 
         contrasenia=p_contrasenia,
         telefono=p_telefono,
         direccion=p_direccion,
         imagenperfil=p_imagenperfil
    WHERE idusuario = p_idusuario;
	     p_ocurrioError := 0;
         p_mensaje := 'Campos actualizados';
         RETURN;
    END IF;     
END;
$BODY$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION SP_OBTENER_GENERO()
RETURNS SETOF "record" 
AS $$
DECLARE 
  r RECORD;
BEGIN
  FOR r IN SELECT  A.idgenero, A.descripcion AS descripcion_genero,
                    B.idfamilia, B.descripcion AS descripcion_familia
           FROM genero AS A  LEFT JOIN familia AS B on A.Familia_idFamilia = B.idFamilia
     LOOP
	    RETURN NEXT r;
	 END LOOP;
	 RETURN;
END;
$$
LANGUAGE plpgsql;

/* ELIMINAR PRODUCTO */

CREATE OR REPLACE FUNCTION SP_ELIMINAR_PRODUCTO(
	IN p_idproducto INT,
	OUT p_ocurrioerror INT,
	OUT p_mensaje VARCHAR(100)
)	
RETURNS record AS $BODY$
DECLARE --imagenes_eliminadas INT[];
BEGIN
    
    /* VERIFICANDO QUE EXISTA EL ID DEL PRODUCTO Y QUE NO SEA NULL */
        IF EXISTS(SELECT * from producto where idproducto=p_idproducto) IS FALSE THEN
           p_ocurrioError := 1;
           p_mensaje := "Error: No se envia ningun ID de producto para eliminar ";
		   RETURN;
        END IF;

        IF p_idproducto=0 or p_idproducto is null THEN
            p_mensaje:=p_mensaje||'p_idproducto, ';
        END IF;

        /* BORRANDO EL PRODUCTO Y DATOS DE TABLAS ASOCIADAS */

	   /* especie asociadas */

	    DELETE FROM public.producto_has_especie
        WHERE producto_idproducto=p_idproducto;
		
		
		--imagenes_eliminadas = 
		--(SELECT ARRAY (SELECT imagenproducto_idimagenproducto FROM producto_has_imagenproducto WHERE producto_idproducto = p_idproducto));

	   /* imagenes asociadas */

	    DELETE FROM public.producto_has_imagenproducto
        WHERE producto_idproducto=p_idproducto;
/* 
		FOR i IN array_lower(imagenes_eliminadas,1).. array_upper(imagenes_eliminadas,1) LOOP
		   		  DELETE FROM public.imagenproducto
	              WHERE idimagenproducto = imagenes_eliminadas[i];
		END LOOP; */
       

        /* el producto */

        DELETE FROM public.producto
        WHERE idproducto = p_idproducto;


	     p_ocurrioError := 0;
         p_mensaje := 'El producto se elimino exitosamente y sus tablas asociadas';
         RETURN;
     
END;
$BODY$
LANGUAGE 'plpgsql';

/* Agregar promocion */

CREATE OR REPLACE FUNCTION SP_AGREGAR_PROMOCION
( 
      
   IN p_idproducto INT,	 
   IN p_descripcion VARCHAR(45),	 
   IN p_fechainicio DATE, 
   IN p_fechafin DATE, 
   IN p_porcentajedescuento DECIMAL,
   OUT p_ocurrioError INT,
   OUT p_mensaje VARCHAR(200),
   OUT p_id INT
   
)
RETURNS RECORD AS $BODY$

	DECLARE vnIdPromocion INT;

    
BEGIN
    p_id = NULL;

 
        IF(p_idproducto IS NULL OR p_descripcion IS NULL OR p_fechainicio IS NULL OR p_fechafin IS NULL OR p_porcentajedescuento IS NULL
        ) THEN
            p_ocurrioError := 1;
            p_mensaje:= 'Error: campos incompletos';
            RETURN;
        END IF;    
   
               /* insert en promocion */
			IF exists (select idproducto from producto where idproducto=p_idproducto) THEN
			
               INSERT INTO promocion(
                  descripcion,
                  fechainicio,
                  fechafin,
                  porcentajedescuento
                  )
               VALUES (
                  p_descripcion,
                  p_fechainicio,
                  p_fechafin,
                  p_porcentajedescuento
               );

                 
        

         SELECT max(idpromocion) INTO vnIdPromocion FROM promocion;  /* Se obtiene el ID de Promocion para insertar en tabla has*/
       
                 /* Se hace Insert en promocion_has_producto */
                  INSERT INTO promocion_has_producto(
                  promocion_idpromocion,
                  producto_idproducto
                  )
               VALUES (
                  vnIdPromocion,
                  p_idproducto
               );
         
         SELECT max(idpromocion) INTO p_id
		   FROM promocion;     /* Se recupera el ID de promocion para mandarlo como respuesta*/
		  
                  p_ocurrioError := 0;
                  p_mensaje:= 'Se ha registrado la promocion y su tabla asociada';
		   RETURN;
		ELSE 
		   p_ocurrioError := 1;
           p_mensaje:= 'Error: No se registro la promocion';
		   RETURN;
	   END IF ;
END;
$BODY$
LANGUAGE 'plpgsql';

/* Eliminar Promocion */

CREATE OR REPLACE FUNCTION SP_ELIMINAR_PROMOCION(
	IN p_idpromocion INT,
	OUT p_ocurrioerror INT,
	OUT p_mensaje VARCHAR(100)
)	
RETURNS record AS $BODY$
DECLARE 
BEGIN
    
    /* VERIFICANDO QUE EXISTA EL ID DEL PROMOCION Y QUE NO SEA NULL */
        IF EXISTS(SELECT idpromocion from promocion where idpromocion=p_idpromocion) IS FALSE THEN
           p_ocurrioError := 1;
           p_mensaje := "Error: No se envia ningun ID de promocion para eliminar ";
		   RETURN;
        END IF;

        IF p_idpromocion=0 or p_idpromocion is null THEN
            p_mensaje:=p_mensaje||'p_idpromocion, ';
        END IF;

        /* BORRANDO EL PROMOCION Y DATOS DE TABLAS ASOCIADAS */

	   /* tabla has asociada */

	    DELETE FROM public.promocion_has_producto
        WHERE promocion_idpromocion=p_idpromocion;
		
		/* Borrar la promocion */

        DELETE FROM public.promocion
        WHERE idpromocion = p_idpromocion;


	     p_ocurrioError := 0;
         p_mensaje := 'El promocion se elimino exitosamente y sus tablas asociadas';
         RETURN;
     
END;
$BODY$
LANGUAGE 'plpgsql';