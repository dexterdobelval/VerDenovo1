package com.verdenovo.api.repository;

import com.verdenovo.api.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query("SELECT u FROM Usuario u WHERE u.email = :email AND u.statusUsuario = :statusUsuario")
    Optional<Usuario> findByEmailAndStatusUsuario(@Param("email") String email, @Param("statusUsuario") String statusUsuario);
    boolean existsByEmail(String email);
}