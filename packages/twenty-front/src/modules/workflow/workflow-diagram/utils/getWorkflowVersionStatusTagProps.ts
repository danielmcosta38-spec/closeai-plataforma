import { type WorkflowVersionStatus } from '@/workflow/types/Workflow';
import { type TagColor } from 'twenty-ui/primitives/data-display';

export const getWorkflowVersionStatusTagProps = ({
  workflowVersionStatus,
}: {
  workflowVersionStatus: WorkflowVersionStatus;
}): { color: TagColor; text: string } => {
  if (workflowVersionStatus === 'ARCHIVED') {
    return {
      color: 'gray',
      text: 'Arquivado',
    };
  }

  if (workflowVersionStatus === 'DRAFT') {
    return {
      color: 'yellow',
      text: 'Rascunho',
    };
  }

  if (workflowVersionStatus === 'ACTIVE') {
    return {
      color: 'green',
      text: 'Ativo',
    };
  }

  return {
    color: 'gray',
    text: 'Desativado',
  };
};
