package com.verdenovo.api.controller;

import com.verdenovo.api.entity.Ponto;
import com.verdenovo.api.entity.Categoria;
import com.verdenovo.api.entity.Usuario;
import com.verdenovo.api.repository.PontoRepository;
import com.verdenovo.api.repository.CategoriaRepository;
import com.verdenovo.api.repository.UsuarioRepository;
import com.verdenovo.api.dto.*;
import com.verdenovo.api.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/pontos")
@CrossOrigin(origins = "*")
public class PontoController {
    
    @Autowired
    private PontoRepository pontoRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<Ponto> listarPontos() {
        return pontoRepository.findByStatusPonto("ATIVO");
    }
    
    @GetMapping("/todos")
    public List<Ponto> listarTodosPontos() {
        return pontoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<com.verdenovo.api.dto.MessageResponse> criarPonto(@RequestBody Ponto ponto) {
        try {
            System.out.println("Dados recebidos: " + ponto.getNome());
            
            // Criptografar senha
            if (ponto.getSenha() != null && !ponto.getSenha().isEmpty()) {
                ponto.setSenha(passwordEncoder.encode(ponto.getSenha()));
            }
            
            ponto.setDataCadastro(LocalDateTime.now());
            ponto.setStatusPonto("ATIVO");
            pontoRepository.save(ponto);
            return ResponseEntity.ok(new com.verdenovo.api.dto.MessageResponse("Ponto cadastrado com sucesso"));
        } catch (Exception e) {
            System.out.println("Erro ao cadastrar ponto: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new com.verdenovo.api.dto.MessageResponse("Erro: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<com.verdenovo.api.dto.MessageResponse> atualizarPonto(@PathVariable Long id, @RequestBody Ponto pontoAtualizado) {
        try {
            Ponto ponto = pontoRepository.findById(id).orElseThrow(() -> new RuntimeException("Ponto não encontrado"));
            
            ponto.setNome(pontoAtualizado.getNome());
            ponto.setCep(pontoAtualizado.getCep());
            ponto.setNumero(pontoAtualizado.getNumero());
            ponto.setComplemento(pontoAtualizado.getComplemento());
            ponto.setTelefone(pontoAtualizado.getTelefone());
            ponto.setHoraFuncionamento(pontoAtualizado.getHoraFuncionamento());
            ponto.setMaterial(pontoAtualizado.getMaterial());
            
            pontoRepository.save(ponto);
            return ResponseEntity.ok(new com.verdenovo.api.dto.MessageResponse("Ponto atualizado com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new com.verdenovo.api.dto.MessageResponse("Erro ao atualizar ponto: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<com.verdenovo.api.dto.MessageResponse> alterarStatusPonto(@PathVariable Long id) {
        try {
            Ponto ponto = pontoRepository.findById(id).orElseThrow(() -> new RuntimeException("Ponto não encontrado"));
            String novoStatus = "ATIVO".equals(ponto.getStatusPonto()) ? "INATIVO" : "ATIVO";
            ponto.setStatusPonto(novoStatus);
            pontoRepository.save(ponto);
            return ResponseEntity.ok(new com.verdenovo.api.dto.MessageResponse("Status do ponto alterado com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new com.verdenovo.api.dto.MessageResponse("Erro ao alterar status: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<com.verdenovo.api.dto.MessageResponse> deletarPonto(@PathVariable Long id) {
        try {
            pontoRepository.deleteById(id);
            return ResponseEntity.ok(new com.verdenovo.api.dto.MessageResponse("Ponto excluído com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new com.verdenovo.api.dto.MessageResponse("Erro ao excluir ponto"));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginPonto(@RequestBody PontoLoginRequest request) {
        try {
            System.out.println("Tentativa de login do ponto: " + request.getEmail());
            Ponto ponto = pontoRepository.findByEmailAndStatusPonto(request.getEmail(), "ATIVO")
                .orElseThrow(() -> new RuntimeException("Ponto não encontrado"));
            
            System.out.println("Ponto encontrado: " + ponto.getNome());
            System.out.println("Verificando senha...");
            
            if (!passwordEncoder.matches(request.getSenha(), ponto.getSenha())) {
                System.out.println("Senha incorreta para: " + request.getEmail());
                throw new RuntimeException("Senha incorreta");
            }
            
            System.out.println("Login bem-sucedido para: " + request.getEmail());
            String token = jwtUtil.generateToken(ponto.getEmail());
            PontoResponse pontoResponse = new PontoResponse(
                ponto.getId(), 
                ponto.getNome(), 
                ponto.getEmail(),
                ponto.getCep(),
                ponto.getNumero(),
                ponto.getComplemento(),
                ponto.getTelefone(),
                ponto.getHoraFuncionamento(),
                ponto.getMaterial()
            );
            
            return ResponseEntity.ok(new PontoLoginResponse(token, pontoResponse));
        } catch (Exception e) {
            System.out.println("Erro no login do ponto: " + e.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}