'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ShippingPerson } from '@/lib/ecwid/types'

interface AddressFormProps {
  title: string
  address: ShippingPerson
  onChange: (address: ShippingPerson) => void
  errors?: Record<string, string>
  className?: string
  disabled?: boolean
}

// US States
const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
]

// Canadian Provinces
const CA_PROVINCES = [
  { code: 'AB', name: 'Alberta' }, { code: 'BC', name: 'British Columbia' },
  { code: 'MB', name: 'Manitoba' }, { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland and Labrador' }, { code: 'NS', name: 'Nova Scotia' },
  { code: 'NT', name: 'Northwest Territories' }, { code: 'NU', name: 'Nunavut' },
  { code: 'ON', name: 'Ontario' }, { code: 'PE', name: 'Prince Edward Island' },
  { code: 'QC', name: 'Quebec' }, { code: 'SK', name: 'Saskatchewan' },
  { code: 'YT', name: 'Yukon' }
]

// Common countries
const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'JP', name: 'Japan' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'MX', name: 'Mexico' },
]

export function AddressForm({ title, address, onChange, errors = {}, className, disabled = false }: AddressFormProps) {
  const handleChange = (field: keyof ShippingPerson, value: string) => {
    onChange({ ...address, [field]: value })
  }
  
  const inputClassName = (field: string) => cn(
    'w-full px-4 py-3 border rounded-xl transition-all',
    'focus:outline-none focus:ring-2 focus:ring-rock-orange/20 focus:border-rock-orange',
    errors[field] ? 'border-red-400 bg-red-50' : 'border-light-border bg-white',
    disabled && 'opacity-60 cursor-not-allowed bg-gray-50'
  )
  
  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold text-content-primary">{title}</h3>
      
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-content-secondary mb-1.5">
          Full Name *
        </label>
        <input
          type="text"
          value={address.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className={inputClassName('name')}
          placeholder="John Smith"
          disabled={disabled}
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
      </div>
      
      {/* Company (optional) */}
      <div>
        <label className="block text-sm font-medium text-content-secondary mb-1.5">
          Company <span className="text-content-muted">(optional)</span>
        </label>
        <input
          type="text"
          value={address.companyName || ''}
          onChange={(e) => handleChange('companyName', e.target.value)}
          className={inputClassName('companyName')}
          placeholder="Company name"
          disabled={disabled}
        />
      </div>
      
      {/* Street Address */}
      <div>
        <label className="block text-sm font-medium text-content-secondary mb-1.5">
          Street Address *
        </label>
        <input
          type="text"
          value={address.street || ''}
          onChange={(e) => handleChange('street', e.target.value)}
          className={inputClassName('street')}
          placeholder="123 Main Street"
          disabled={disabled}
        />
        {errors.street && <p className="text-sm text-red-500 mt-1">{errors.street}</p>}
      </div>
      
      {/* City, State, Zip Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* City */}
        <div>
          <label className="block text-sm font-medium text-content-secondary mb-1.5">
            City *
          </label>
          <input
            type="text"
            value={address.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className={inputClassName('city')}
            placeholder="City"
            disabled={disabled}
          />
          {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
        </div>
        
        {/* State / Province */}
        <div>
          <label className="block text-sm font-medium text-content-secondary mb-1.5">
            {address.countryCode === 'CA' ? 'Province' : 'State'} *
          </label>
          {address.countryCode === 'US' ? (
            <select
              value={address.stateOrProvinceCode || ''}
              onChange={(e) => handleChange('stateOrProvinceCode', e.target.value)}
              className={inputClassName('stateOrProvinceCode')}
              disabled={disabled}
            >
              <option value="">Select state</option>
              {US_STATES.map((state) => (
                <option key={state.code} value={state.code}>{state.name}</option>
              ))}
            </select>
          ) : address.countryCode === 'CA' ? (
            <select
              value={address.stateOrProvinceCode || ''}
              onChange={(e) => handleChange('stateOrProvinceCode', e.target.value)}
              className={inputClassName('stateOrProvinceCode')}
              disabled={disabled}
            >
              <option value="">Select province</option>
              {CA_PROVINCES.map((province) => (
                <option key={province.code} value={province.code}>{province.name}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={address.stateOrProvinceName || ''}
              onChange={(e) => handleChange('stateOrProvinceName', e.target.value)}
              className={inputClassName('stateOrProvinceName')}
              placeholder="State/Province"
              disabled={disabled}
            />
          )}
          {errors.stateOrProvinceCode && <p className="text-sm text-red-500 mt-1">{errors.stateOrProvinceCode}</p>}
        </div>
        
        {/* Zip / Postal Code */}
        <div>
          <label className="block text-sm font-medium text-content-secondary mb-1.5">
            {address.countryCode === 'CA' ? 'Postal Code' : 'ZIP Code'} *
          </label>
          <input
            type="text"
            value={address.postalCode || ''}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            className={inputClassName('postalCode')}
            placeholder={address.countryCode === 'CA' ? 'A1A 1A1' : '12345'}
            disabled={disabled}
          />
          {errors.postalCode && <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>}
        </div>
      </div>
      
      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-content-secondary mb-1.5">
          Country *
        </label>
        <select
          value={address.countryCode || 'US'}
          onChange={(e) => {
            // Clear state when country changes
            handleChange('countryCode', e.target.value)
            if (e.target.value !== address.countryCode) {
              handleChange('stateOrProvinceCode', '')
              handleChange('stateOrProvinceName', '')
            }
          }}
          className={inputClassName('countryCode')}
          disabled={disabled}
        >
          {COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>{country.name}</option>
          ))}
        </select>
        {errors.countryCode && <p className="text-sm text-red-500 mt-1">{errors.countryCode}</p>}
      </div>
      
      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-content-secondary mb-1.5">
          Phone <span className="text-content-muted">(for delivery updates)</span>
        </label>
        <input
          type="tel"
          value={address.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={inputClassName('phone')}
          placeholder="(555) 123-4567"
          disabled={disabled}
        />
        <p className="text-xs text-content-muted mt-1">
          Required for shipping carriers to contact you about delivery
        </p>
      </div>
    </div>
  )
}
