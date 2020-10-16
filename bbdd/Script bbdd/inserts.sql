--Inserts en tipo usuario
INSERT INTO public.tipousuario(
	rol, fecha_inicio, estado)
	VALUES ('admin', current_date, 'activo');

INSERT INTO public.tipousuario(
rol, fecha_inicio, estado)
VALUES ('cliente', current_date, 'activo');

--Insert usuario administrador
INSERT INTO public.usuario(
	nombre, correo, contrasenia, telefono, direccion, tipo_usuario_idtipo_usuario, fecharegistro)
	VALUES ('Signe', 'admin@email.com', '$2b$10$9i.gUqog92qBF2sGbWARfeLRN6utq7r.8Zr8yLq7REqwk8EGCg4Jq', '56326541', 'Honduras', 1, CURRENT_DATE);