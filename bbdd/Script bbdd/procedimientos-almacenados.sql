

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