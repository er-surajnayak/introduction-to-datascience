import { module1QuestionBank, ModuleQuestionBank, QuestionBankItem } from './module1';

export type { ModuleQuestionBank, QuestionBankItem };

export const allQuestionBanks: Record<string, ModuleQuestionBank> = {
  'module-1': module1QuestionBank,
};

export function getQuestionBankByModuleId(moduleId: string): ModuleQuestionBank | undefined {
  return allQuestionBanks[moduleId];
}
