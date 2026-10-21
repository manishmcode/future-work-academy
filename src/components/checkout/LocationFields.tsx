import React, { useMemo } from 'react';
import { City, Country, State } from 'country-state-city';
import { SearchableCountrySelect } from './SearchableCountrySelect';

type LocationFieldsProps = {
  countryCode: string;
  stateCode: string;
  cityName: string;
  onCountryChange: (isoCode: string) => void;
  onStateChange: (isoCode: string) => void;
  onCityChange: (name: string) => void;
  idPrefix?: string;
};

const selectClass =
  'w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-[15px] focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400 disabled:opacity-60 disabled:cursor-not-allowed';

const labelClass = 'block text-[13px] font-bold text-slate-700 tracking-wide uppercase mb-2';

export const LocationFields = ({
  countryCode,
  stateCode,
  cityName,
  onCountryChange,
  onStateChange,
  onCityChange,
  idPrefix = 'checkout',
}: LocationFieldsProps) => {
  const countries = useMemo(
    () => Country.getAllCountries().sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const states = useMemo(
    () => (countryCode ? State.getStatesOfCountry(countryCode) : []),
    [countryCode],
  );

  const cityOptions = useMemo(() => {
    if (!countryCode) return [];
    if (states.length > 0) {
      if (!stateCode) return [];
      return City.getCitiesOfState(countryCode, stateCode) ?? [];
    }
    return City.getCitiesOfCountry(countryCode) ?? [];
  }, [countryCode, stateCode, states.length]);

  const showState = countryCode !== '' && states.length > 0;
  const cityDisabled =
    !countryCode || (showState && !stateCode) || cityOptions.length === 0;

  return (
    <>
      <div>
        <label htmlFor={`${idPrefix}-country`} className={labelClass}>
          Country <span className="text-pink-600">*</span>
        </label>
        <SearchableCountrySelect
          id={`${idPrefix}-country`}
          countries={countries}
          value={countryCode}
          onChange={onCountryChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor={`${idPrefix}-state`} className={labelClass}>
            State / region {showState && <span className="text-pink-600">*</span>}
          </label>
          <select
            id={`${idPrefix}-state`}
            className={selectClass}
            value={stateCode}
            onChange={(e) => onStateChange(e.target.value)}
            disabled={!showState}
            required={showState}
          >
            <option value="">
              {!countryCode
                ? 'Select a country first'
                : showState
                  ? 'Select your state / region'
                  : 'Not required for this country'}
            </option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-city`} className={labelClass}>
            Town / city <span className="text-pink-600">*</span>
          </label>
          {cityOptions.length > 0 ? (
            <select
              id={`${idPrefix}-city`}
              className={selectClass}
              value={cityName}
              onChange={(e) => onCityChange(e.target.value)}
              disabled={cityDisabled}
              required
            >
              <option value="">
                {cityDisabled ? 'Select country and region first' : 'Select your town / city'}
              </option>
              {cityOptions.map((city) => (
                <option key={`${city.name}-${city.latitude}`} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={`${idPrefix}-city`}
              type="text"
              className={selectClass.replace('disabled:cursor-not-allowed', '')}
              value={cityName}
              onChange={(e) => onCityChange(e.target.value)}
              disabled={!countryCode || (showState && !stateCode)}
              placeholder={
                !countryCode ? 'Select a country first' : 'Enter your town / city'
              }
              required
            />
          )}
        </div>
      </div>
    </>
  );
};
