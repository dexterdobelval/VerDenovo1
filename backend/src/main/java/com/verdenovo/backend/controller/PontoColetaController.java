package com.verdenovo.backend.controller;

import com.verdenovo.backend.entity.PontoColeta;
import com.verdenovo.backend.repository.PontoColetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/pontos")
@CrossOrigin(origins = "*")
public class PontoColetaController {

    @Autowired
    private PontoColetaRepository pontoColetaRepository;

    @GetMapping
    public List<PontoColeta> listarTodos() {
        return pontoColetaRepository.findAll();
    }

    @GetMapping("/ativos")
    public List<PontoColeta> listarAtivos() {
        return pontoColetaRepository.findByAtivoTrue();
    }

    @PostMapping
    public PontoColeta criar(@RequestBody PontoColeta pontoColeta) {
        if (pontoColeta.getCodigo() == null || pontoColeta.getCodigo().isEmpty()) {
            pontoColeta.setCodigo(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return pontoColetaRepository.save(pontoColeta);
    }

    @PostMapping("/login")
    public ResponseEntity<PontoColeta> login(@RequestBody PontoColeta loginData) {
        Optional<PontoColeta> ponto = pontoColetaRepository.findByEmailAndSenha(loginData.getEmail(), loginData.getSenha());
        if (ponto.isPresent() && ponto.get().getAtivo()) {
            return ResponseEntity.ok(ponto.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<PontoColeta> atualizar(@PathVariable Long id, @RequestBody PontoColeta pontoAtualizado) {
        Optional<PontoColeta> pontoExistente = pontoColetaRepository.findById(id);
        if (pontoExistente.isPresent()) {
            PontoColeta ponto = pontoExistente.get();
            ponto.setNome(pontoAtualizado.getNome());
            ponto.setEmail(pontoAtualizado.getEmail());
            if (pontoAtualizado.getSenha() != null) {
                ponto.setSenha(pontoAtualizado.getSenha());
            }
            ponto.setEndereco(pontoAtualizado.getEndereco());
            ponto.setCidade(pontoAtualizado.getCidade());
            ponto.setCep(pontoAtualizado.getCep());
            ponto.setTelefone(pontoAtualizado.getTelefone());
            ponto.setHorario(pontoAtualizado.getHorario());
            ponto.setDescricao(pontoAtualizado.getDescricao());
            ponto.setImagemPonto(pontoAtualizado.getImagemPonto());
            ponto.setPapel(pontoAtualizado.getPapel());
            ponto.setPlastico(pontoAtualizado.getPlastico());
            ponto.setVidro(pontoAtualizado.getVidro());
            ponto.setMetal(pontoAtualizado.getMetal());
            ponto.setAtivo(pontoAtualizado.getAtivo());
            return ResponseEntity.ok(pontoColetaRepository.save(ponto));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (pontoColetaRepository.existsById(id)) {
            pontoColetaRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}