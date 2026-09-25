import { module1QuestionBank, ModuleQuestionBank, QuestionBankItem } from './module1';
import { module2QuestionBank } from './module2';

export type { ModuleQuestionBank, QuestionBankItem };

export const allQuestionBanks: Record<string, ModuleQuestionBank> = {
  'module-1': module1QuestionBank,
  'module-2': module2QuestionBank,
};

export function getQuestionBankByModuleId(moduleId: string): ModuleQuestionBank | undefined {
  return allQuestionBanks[moduleId];
}
