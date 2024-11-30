import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Select } from './Select';
import { DatePicker } from './DatePicker';
import { TextArea } from './TextArea';
import { Input } from './Input';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface MovementFormProps {
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  movementType: z.string().min(1, "Le type de mouvement est requis"),
  amount: z.number().min(0, "Le montant doit être positif"),
  fees: z.number().min(0, "Les frais doivent être positifs").max(100, "Les frais ne peuvent pas dépasser 100%"),
  effectiveDate: z.string().min(1, "La date d'effet est requise"),
  boDate: z.string().min(1, "La date BO est requise"),
  movementValidationStatus: z.string(),
  boStatus: z.string(),
  boManager: z.string(),
  advisor: z.string(),
  comment: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

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

export function MovementForm({ onClose, onSubmit }: MovementFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      fees: 0,
      movementValidationStatus: 'pending',
      boStatus: 'pending'
    }
  });

  const amount = watch('amount') || 0;
  const fees = watch('fees') || 0;
  const netAmount = amount * (1 - fees / 100);
  const feesAmount = amount * (fees / 100);

  const handleClose = () => {
    if (isDirty) {
      if (window.confirm('Des modifications non sauvegardées seront perdues. Voulez-vous vraiment fermer ?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const onFormSubmit = (data: FormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="overflow-y-auto fixed inset-0">
          <div className="flex justify-center items-center p-4 min-h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative p-6 w-full max-w-2xl bg-white rounded-lg transition-all transform">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-blue-600">
                      Nom
                    </label>
                    <Input 
                      {...register('name')}
                      placeholder="Versement initial" 
                      error={errors.name?.message}
                    />
                  </div>

                  {/* Movement Type */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-blue-600">
                      Type de mouvement
                    </label>
                    <Select
                      {...register('movementType')}
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
                      error={errors.movementType?.message}
                    />
                  </div>

                  {/* Amount Section */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-blue-600">
                      Montant
                    </label>
                    <div className="flex gap-4 items-start">
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        {...register('amount', { valueAsNumber: true })}
                        error={errors.amount?.message}
                      />
                    </div>
                  </div>

                  {/* Net Amount and Fees Display */}
                  <div className="flex gap-8 justify-end mb-4">
                    <div>
                      <div className="text-sm font-medium text-blue-600">Montant net</div>
                      <div className="text-right">{netAmount.toFixed(2)} €</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-blue-600">Montant des frais</div>
                      <div className="text-right">{feesAmount.toFixed(2)} €</div>
                    </div>
                  </div>

                  {/* Dates and Status Section */}
                  <div className="grid grid-cols-2 gap-x-16">
                    <div className="space-y-4">
                      {/* Date d'effet */}
                      <div>
                        <label className="block mb-1 text-sm font-medium text-blue-600">
                          Date d'effet
                        </label>
                        <Input 
                          type="date" 
                          {...register('effectiveDate')}
                          error={errors.effectiveDate?.message}
                        />
                      </div>

                      {/* Date BO */}
                      <div>
                        <label className="block mb-1 text-sm font-medium text-blue-600">
                          Date BO
                        </label>
                        <Input 
                          type="date" 
                          {...register('boDate')}
                          error={errors.boDate?.message}
                        />
                      </div>

                      {/* Fees */}
                      <div>
                        <label className="block mb-1 text-sm font-medium text-blue-600">
                          Frais
                        </label>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          suffix="%" 
                          {...register('fees', { valueAsNumber: true })}
                          error={errors.fees?.message}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Movement Validation Status */}
                      <div>
                        <label className="block mb-1 text-sm font-medium text-blue-600">
                          Statut validation mouvement
                        </label>
                        <Select
                          {...register('movementValidationStatus')}
                          options={[
                            { label: 'En attente', value: 'pending' },
                            { label: 'Validé', value: 'validated' },
                            { label: 'Rejeté', value: 'rejected' },
                          ]}
                          error={errors.movementValidationStatus?.message}
                        />
                      </div>

                      {/* BO Movement Status */}
                      <div>
                        <label className="block mb-1 text-sm font-medium text-blue-600">
                          Statut BO du mouvement
                        </label>
                        <Select
                          {...register('boStatus')}
                          options={[
                            { label: 'En attente', value: 'pending' },
                            { label: 'Traité', value: 'processed' },
                            { label: 'Rejeté', value: 'rejected' },
                          ]}
                          error={errors.boStatus?.message}
                        />
                      </div>

                      {/* BO Manager */}
                      <div>
                        <label className="block mb-1 text-sm font-medium text-blue-600">
                          Gestionnaire BO
                        </label>
                        <Select
                          {...register('boManager')}
                          options={[
                            { label: 'Gestionnaire 1', value: 'manager1' },
                            { label: 'Gestionnaire 2', value: 'manager2' },
                          ]}
                          error={errors.boManager?.message}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Advisor */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-blue-600">
                      Conseiller
                    </label>
                    <Select
                      {...register('advisor')}
                      options={[
                        { label: 'Conseiller 1', value: 'advisor1' },
                        { label: 'Conseiller 2', value: 'advisor2' },
                      ]}
                      error={errors.advisor?.message}
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-blue-600">
                      Commentaire
                    </label>
                    <TextArea 
                      {...register('comment')}
                      placeholder="Note" 
                      rows={4}
                      error={errors.comment?.message}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}