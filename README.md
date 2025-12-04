# Projeto Fênix – Desafio React / Next.js

Este projeto foi desenvolvido como parte do desafio técnico da Loomi para recriar a interface da plataforma Nortus, utilizando tecnologias modernas e consumindo uma API legacy (v1).

O objetivo é entregar uma experiência rápida, fluida e funcional, seguindo o protótipo do Figma e os requisitos técnicos descritos no escopo do desafio.

---

## 🚀 Tecnologias Utilizadas
- Next.js (12+)
- React + TypeScript
- TailwindCSS
- Axios
- Zustand
- Zod
- ApexCharts (KPIs)
- OpenLayers (mapas)
- Sonner (feedbacks)

---

## 📌 Funcionalidades do Projeto
- **Login** com validação, toggle de senha e autenticação via API  
- **Dashboard de KPIs** com gráficos e mapas  
- **Gestão de Tickets** (listagem, novo ticket e feedback de sucesso)  
- **Chat com Assistente Virtual** (sugestões mockadas)  
- **Simulador de Planos** com cálculos em tempo real

---

## 📂 Estrutura Geral
src/
├─ app/ # Rotas
├─ components/ # Componentes reutilizáveis
├─ features/ # Módulos principais (login, tickets, chat...)
├─ services/ # Requisições à API
├─ stores/ # Estado global (Zustand)
├─ schemas/ # Validação com Zod
├─ utils/ # Helpers


---

## 🧪 Como Rodar o Projeto
```bash
npm install
npm run dev
```

## 🔗 API do Desafio
A aplicação consome dados da API v1 disponibilizada no desafio:
https://nortus-challenge.api.stage.loomi.com.br/docs

## 📌 Observações
- O projeto segue Gitflow básico (main / feature/*)
- Token de autenticação é salvo em cookies
- Dados do usuário são salvos em localStorage
- Responsividade mínima: 1000px

## 👨‍💻 Autor
  - Wagner Brenner 