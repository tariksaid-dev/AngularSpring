INSERT INTO regiones (id, nombre) VALUES (1, "Sudamérica");
INSERT INTO regiones (id, nombre) VALUES (2, "Centroamérica");
INSERT INTO regiones (id, nombre) VALUES (3, "Norteamérica");
INSERT INTO regiones (id, nombre) VALUES (4, "Europa");
INSERT INTO regiones (id, nombre) VALUES (5, "Asia");
INSERT INTO regiones (id, nombre) VALUES (6, "Africa");
INSERT INTO regiones (id, nombre) VALUES (7, "Oceanía");
INSERT INTO regiones (id, nombre) VALUES (8, "Antártida");



INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (1, 'Tarik', 'Said', 'tarik.said@test.com', '2022-10-12');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (2, 'Ana', 'González', 'ana.gonzalez@test.com', '2023-03-05');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (3, 'Lucas', 'Fernández', 'lucas.fernandez@test.com', '2023-02-20');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (4, 'María', 'Ramírez', 'maria.ramirez@test.com', '2023-01-15');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (5, 'Pedro', 'Rodríguez', 'pedro.rodriguez@test.com', '2022-12-25');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (6, 'Isabel', 'Hernández', 'isabel.hernandez@test.com', '2022-11-11');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (7, 'Santiago', 'Sánchez', 'santiago.sanchez@test.com', '2022-09-29');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (8, 'Lorena', 'Martínez', 'lorena.martinez@test.com', '2022-08-14');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (1, 'David', 'García', 'david.garcia@test.com', '2022-07-03');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (2, 'Carla', 'López', 'carla.lopez@test.com', '2022-06-01');

INSERT INTO `usuarios` (username, password, enabled, nombre, apellido, email) VALUES ('andres', '$2a$10$neUfNVCwKgZ6EUPouy.6OekkKgUr/9PhauooweVAZWuAZHJk5iTWi', 1, 'Andres', 'Guzman', 'andres@guzman.com');
insert into `usuarios` (username, password, enabled, nombre, apellido, email) VALUES ('admin', '$2a$10$Z4eYWFX9x28KIgNuPHCCB.qqUmuwrIkbaEQMR3qjgic49ZDRO4k3y', 1, 'John', 'Doe', 'jhondoe@jhondoe.com');

INSERT INTO `roles` (nombre) VALUES ('ROLE_USER');
INSERT INTO `roles` (nombre) VALUES ('ROLE_ADMIN');

INSERT INTO `usuarios_roles` (usuario_id, role_id) VALUES (1, 1);
INSERT INTO `usuarios_roles` (usuario_id, role_id) VALUES (2, 2);
INSERT INTO `usuarios_roles` (usuario_id, role_id) VALUES (2, 1);