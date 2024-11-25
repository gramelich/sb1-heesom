import React from 'react';
import { useTelegram } from '../context/TelegramContext';
import { Save } from 'lucide-react';
import { initSupabase } from '../lib/supabase';

const Settings = () => {
  const { config, updateConfig } = useTelegram();
  const [formData, setFormData] = React.useState(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.supabase.url && formData.supabase.apiKey) {
      try {
        initSupabase(formData.supabase.url, formData.supabase.apiKey);
        updateConfig(formData);
      } catch (error) {
        alert('Erro ao conectar com Supabase. Verifique suas credenciais.');
        return;
      }
    }
    updateConfig(formData);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Supabase</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">URL do Projeto</label>
              <input
                type="text"
                value={formData.supabase.url}
                onChange={(e) => setFormData({
                  ...formData,
                  supabase: { ...formData.supabase, url: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://seu-projeto.supabase.co"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Chave da API</label>
              <input
                type="password"
                value={formData.supabase.apiKey}
                onChange={(e) => setFormData({
                  ...formData,
                  supabase: { ...formData.supabase, apiKey: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="sua-chave-api-supabase"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Notificações Telegram</h2>
            
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.telegram.enabled}
                  onChange={(e) => setFormData({
                    ...formData,
                    telegram: { ...formData.telegram, enabled: e.target.checked }
                  })}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">Ativar Notificações</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Token do Bot</label>
              <input
                type="password"
                value={formData.telegram.botToken}
                onChange={(e) => setFormData({
                  ...formData,
                  telegram: { ...formData.telegram, botToken: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Token do seu bot"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">ID do Chat</label>
              <input
                type="text"
                value={formData.telegram.chatId}
                onChange={(e) => setFormData({
                  ...formData,
                  telegram: { ...formData.telegram, chatId: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="ID do chat ou grupo"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Salvar Configurações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;