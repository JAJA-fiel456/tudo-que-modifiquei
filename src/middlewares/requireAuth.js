import { auth } from "../lib/auth.js";

export const requireAuth = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return res.status(401).json({
        error: "Não autorizado",
      });
    }

    req.user = session.user;

    // LOG DE SEGURANÇA
    console.log(
      `[SEGURANÇA] Usuário ${session.user.email} acessou ${req.method} ${req.originalUrl}`
    );

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao verificar autenticação",
    });
  }
};