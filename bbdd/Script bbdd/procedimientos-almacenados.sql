
CREATE OR REPLACE FUNCTION SP_REGISTRO_EMPLEADO
(
  
)
RETURNS RECORD AS $BODY$
DECLARE vcMensaje VARCHAR(1000);
DECLARE vnIdEmpleado INT;
DECLARE vnIdpersona INT;
DECLARE vdfechaContratacion date;
BEGIN

END;
$BODY$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION SP_AGREGAR_USUARIO
(    
   IN p_nombre VARCHAR(45),	 
   IN p_correo VARCHAR(45), 
   IN p_contrasenia VARCHAR(45),
   IN p_telefono VARCHAR(45),
   IN p_direccion VARCHAR(200),
   IN p_tipo_usuario INT,
   OUT p_ocurrioError INT,
   OUT p_mensaje VARCHAR(200)	
)
RETURNS RECORD AS $BODY$
DECLARE cantidad INT;  
BEGIN
   IF(p_correo IS NULL OR p_contrasenia IS NULL OR p_nombre IS NULL) THEN
      p_ocurrioError := 1;
      p_mensaje:= 'Error: Campos incompletos';
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
		   RETURN;
		ELSE 
		   p_ocurrioError := 1;
           p_mensaje:= 'Error: Ya existe un usuario con registrado con este correo';
		   RETURN;
	    END IF;   	
	END IF;	
END;
$BODY$
LANGUAGE 'plpgsql';



