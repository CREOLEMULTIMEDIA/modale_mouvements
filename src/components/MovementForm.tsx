import React from 'react';
import { X } from 'lucide-react';
import { Select } from './Select';
import { DatePicker } from './DatePicker';
import { TextArea } from './TextArea';
import { Input } from './Input';

interface MovementFormProps {
  onClose: () => void;
}

const MOVEMENT_OPTIONS = {
  arbitrage: {
    Arbitrage: "Arbitrage"
  },
  autres: {
    Avances: "Avances",
    "Changements de profil": "Changements de profil",
    "Chiffre d'affaires": "Chiffre d'affaires",
    "Frais et Prélèvements": "Frais et Prélèvements",
    "Mouvements d'espèces": "Mouvements d'espèces",
    "Mouvements de titres": "Mouvements de titres",
    "Non compté dans la collecte": "Non compté dans la collecte",
    "Opérations liées à la propriété": "Opérations liées à la propriété",
    Virements: "Virements"
  },
  desinvestissement: {
    Annulation: "Annulation",
    Décès: "Décès",
    "Rachat Partiel Programmé": "Rachat Partiel Programmé",
    "Rachat Partiel Retrait": "Rachat Partiel Retrait",
    "Rachat Total": "Rachat Total",
    Renonciation: "Renonciation",
    "Transfert sortant": "Transfert sortant"
  },
  investissement: {
    Souscription: "Souscription",
    "Transfert entrant": "Transfert entrant",
    "Versement Libre": "Versement Libre",
    "Versement Programmé": "Versement Programmé"
  }
};

export function MovementForm({ onClose }: MovementFormProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Nom
            </label>
            <Input placeholder="Versement initial" />
          </div>

          {/* Movement Type */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Type de mouvement
            </label>
            <Select
              options={[
                {
                  label: 'Arbitrage',
                  options: Object.entries(MOVEMENT_OPTIONS.arbitrage).map(([value, label]) => ({ value, label }))
                },
                {
                  label: 'Autres',
                  options: Object.entries(MOVEMENT_OPTIONS.autres).map(([value, label]) => ({ value, label }))
                },
                {
                  label: 'Désinvestissement',
                  options: Object.entries(MOVEMENT_OPTIONS.desinvestissement).map(([value, label]) => ({ value, label }))
                },
                {
                  label: 'Investissement',
                  options: Object.entries(MOVEMENT_OPTIONS.investissement).map(([value, label]) => ({ value, label }))
                }
              ]}
              isOptionDisabled={(option) => !option.value}
            />
          </div>

          {/* Amount Section */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Montant
            </label>
            <div className="flex gap-4 items-start">
              <Input type="number" placeholder="0.00" />
              <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md">
                Frais
              </button>
            </div>
          </div>

          {/* Net Amount and Fees Display */}
          <div className="flex justify-end gap-8 mb-4">
            <div>
              <div className="text-sm font-medium text-blue-600">Montant net</div>
              <div className="text-right">0.00 €</div>
            </div>
            <div>
              <div className="text-sm font-medium text-blue-600">Montant des frais</div>
              <div className="text-right">0.00 €</div>
            </div>
          </div>

          {/* Dates and Status Section */}
          <div className="grid grid-cols-2 gap-x-16">
            <div className="space-y-4">
              {/* Date d'effet */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Date d'effet
                </label>
                <DatePicker />
              </div>

              {/* Date BO */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Date BO
                </label>
                <DatePicker />
              </div>

              {/* Fees */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Frais
                </label>
                <Input type="number" placeholder="0" suffix="%" />
              </div>
            </div>

            <div className="space-y-4">
              {/* Movement Validation Status */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Statut validation mouvement
                </label>
                <Select
                  options={[
                    { label: 'En attente', value: 'pending' },
                    { label: 'Validé', value: 'validated' },
                    { label: 'Rejeté', value: 'rejected' },
                  ]}
                />
              </div>

              {/* BO Movement Status */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Statut BO du mouvement
                </label>
                <Select
                  options={[
                    { label: 'En attente', value: 'pending' },
                    { label: 'Traité', value: 'processed' },
                    { label: 'Rejeté', value: 'rejected' },
                  ]}
                />
              </div>

              {/* BO Manager */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Gestionnaire BO
                </label>
                <Select
                  options={[
                    { label: 'Gestionnaire 1', value: 'manager1' },
                    { label: 'Gestionnaire 2', value: 'manager2' },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Advisor */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Conseiller
            </label>
            <Select
              options={[
                { label: 'Conseiller 1', value: 'advisor1' },
                { label: 'Conseiller 2', value: 'advisor2' },
              ]}
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Commentaire
            </label>
            <TextArea placeholder="Note" rows={4} />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}