import type { IDaCte } from "@/modules/interfaces/IDaCte";

/**
 * CT-e OS (modelo 67) — "Conhecimento de Transporte Eletrônico para Outros
 * Serviços". Structurally it mirrors the ordinary CT-e (modelo 57): the root
 * element is `cteOSProc/CTeOS` instead of `cteProc/CTe`, but the `infCte`
 * payload overlaps heavily, so we reuse the CT-e node typings here.
 *
 * NOTE: this is a scaffold. Once a real model-67 XML sample is available the
 * fields that genuinely differ from the modelo 57 (single `toma`, `infModal`
 * specifics, etc.) should be modelled explicitly instead of being reused.
 */
type CteProc = NonNullable<IDaCte["cteProc"]>;

export interface ICteOS {
	cteOSProc?: {
		CTeOS?: CteProc["CTe"];
		protCTe?: CteProc["protCTe"];
	};
}
