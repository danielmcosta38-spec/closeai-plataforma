import { Injectable } from '@nestjs/common';

import { SearchHelpCenterInputZodSchema } from 'src/engine/core-modules/tool/tools/search-help-center-tool/search-help-center-tool.schema';
import { type ToolInput } from 'src/engine/core-modules/tool/types/tool-input.type';
import { type ToolOutput } from 'src/engine/core-modules/tool/types/tool-output.type';
import { type ToolExecutionContext } from 'src/engine/core-modules/tool/types/tool-execution-context.type';
import { type Tool } from 'src/engine/core-modules/tool/types/tool.type';

// CloseAI: a ajuda original pesquisa a documentação da base num serviço
// externo, o que mandava as perguntas dos utilizadores para fora e trazia
// respostas com outra marca. Fica a ferramenta (o resto do código conta com
// ela), mas não sai nada daqui.
@Injectable()
export class SearchHelpCenterTool implements Tool {
  description =
    'Explain how to use CloseAI. There is no external documentation: answer from what you know about the CRM features and the data model.';
  inputSchema = SearchHelpCenterInputZodSchema;

  async execute(
    parameters: ToolInput,
    _context: ToolExecutionContext,
  ): Promise<ToolOutput> {
    return {
      success: true,
      message: `No external help articles for "${parameters.query}". Answer from the CRM features and data model you can inspect with the other tools.`,
      result: [],
    };
  }
}
